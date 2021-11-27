require("dotenv").config();
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_SECRET } = process.env;

//Middleware para proteger los recursos mediante la autenticación
exports.checkAuth = function (req, res, next) {
  const header = req.header("Authorization");

  if (!header) {
    throw new Error("Acceso denegado");
  } else {
    //Authorization: bearer token
    const [bearer, token] = header.split(" ");
    if (bearer == "Bearer" && token) {
      try {
        const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.usuario = payload.usuario;
        next();
      } catch (error) {
        //Manejo de errores en el Token
        if (error.name == "TokenExpiredError") {
          throw new Error("Token expirados. Ingrese de nuevo.");
        } else if (error.name == "JsonWebTokenError") {
          throw new Error("Token no válido.");
        }
      }
    } else {
      throw new Error("Token incorrecto");
    }
  }
};
