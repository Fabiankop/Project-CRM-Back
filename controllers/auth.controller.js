const Usuario = require("../models/usuarios.model");
const createError = require("http-errors");
const { jsonResponse } = require("../lib/jsonresponse");
const token = require("../models/token.model");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

//Signup Register user
exports.singUp = async function (req, res, next) {
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
      const accessToken = user.createAccessToken();
      const refreshToken = await user.createRefreshToken();
      await user.save();
      res.json(
        jsonResponse(200, {
          message: "Usuario registrado de manera exitosa.",
          accessToken,
          refreshToken,
        })
      );
    }
  }
};

exports.login = async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, "Usuario y/o contraseña vacíos"));
  } else if (username && password) {
    try {
      let user = new Usuario({ username, password });
      const userExists = user.userNanameExists(username);

      if (userExists) {
        user = await Usuario.findOne({ username: username });
        const passwordCorrect = user.isCorrectPassword(password, user.password);

        if (passwordCorrect) {
          const accessToken = user.createAccessToken();
          const refreshToken = await user.createRefreshToken();

          res.json(
            jsonResponse(200, {
              message: "Información de usuario correcta",
              accessToken,
              refreshToken,
            })
          );
        } else {
          next(createError(400, "Usuario y/o password incorrecto."));
        }
      } else {
        next(createError(400, "Usuario y/o password incorrecto."));
      }
    } catch (error) {}
  }
};
