const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { jsonResponse } = require("../lib/jsonresponse");
const Token = require("../models/token.model");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const Usuario = require("../models/usuarios.model");

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

//Login
exports.login = async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, "Usuario y/o contraseña vacíos"));
  } else if (username && password) {
    try {
      let user = new Usuario({ username, password });
      const userExists = user.userNameExists(username);

      if (userExists) {
        const usr = await Usuario.findOne({ username: username });
        const passwordCorrect = usr.isCorrectPassword(password, user.password);

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

//Logout
exports.logout = async function (req, res, next) {
  const { refreshToken } = req.body;

  if (!refreshToken) next(createError(400, "No hay Token asignado"));

  try {
    await Token.findOneAndRemove({ token: refreshToken });
    res.json(
      jsonResponse(200, {
        message: "Logout exitosamente",
      })
    );
  } catch (error) {
    next(createError(400, "No se encontró token"));
  }
};

//RefreshToken
exports.refreshToken = async function (req, res, next) {
  const { refreshToken } = req.body;

  if (!refreshToken) next(createError(400, "No hay Token asignado"));

  try {
    const tokenDoc = await Token.findOne({ token: refreshToken });

    if (!tokenDoc) {
      next(createError(400, "No se encontró token"));
    } else {
      const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.json(
        jsonResponse(200, {
          message: "Access Token actualizado",
          accessToken,
        })
      );
    }
  } catch (error) {
    next(createError(400, "No se encontró token 2"));
  }
};
