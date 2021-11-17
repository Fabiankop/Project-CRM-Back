const Usuario = require("../models/usuarios.model");
const createError = require("http-errors");
const { jsonResponse } = require("../lib/jsonresponse");

// GET all users
exports.getAllUser = async function (req, res, next) {
  let results = {};

  try {
    results = await Usuario.find({}, "username password");
  } catch (error) {}

  res.json(results);
};

//Register User
exports.postUser = async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, "Usuario y/o contraseña vacíos"));
  } else if (username && password) {
    const user = new Usuario({ username, password });
    const exists = await user.userNameExists(username);

    if (exists) {
      //Existe el nombre de usuario
      next(
        createError(400, "El nombre de usuario ya existe. Intente con otro.")
      );
    } else {
      await user.save();
      res.json(
        jsonResponse(200, {
          message: "Usuario registrado de manera exitosa.",
        })
      );
    }
  }
};
