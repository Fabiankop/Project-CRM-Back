require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const Token = require("./token.model");

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 128 },
  name: { type: String },
});

//METHODS for Usuario schema

//Modificar campo password para insertar hash

UsuarioSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

// Is user name exist
UsuarioSchema.methods.userNameExists = async function (username) {
  try {
    let result = await mongoose.model("Usuario").find({ username: username });
    return result.length > 0;
  } catch (error) {
    return false;
  }
};

//is correct password ?

UsuarioSchema.methods.isCorrectPassword = async function (password, hash) {
  try {
    const same = await bcrypt.compare(password, hash);
    return same;
  } catch (error) {
    return false;
  }
};

//Create AccesToken
UsuarioSchema.methods.createAccessToken = function () {
  const { id, username } = this;
  const accessToken = jwt.sign(
    { user: { id, username } },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return accessToken;
};

//Create RefreshAccesToken
UsuarioSchema.methods.createRefreshToken = async function () {
  const { id, username } = this;
  const refreshToken = jwt.sign(
    { user: { id, username } },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "20d" }
  );
  try {
    await new Token({ token: refreshToken }).save();
    return refreshToken;
  } catch (error) {
    next(new Error("Error creating refresh token"));
  }
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
