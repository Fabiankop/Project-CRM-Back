const express = require("express");
const router = express.Router();
var auth = require("../auth/auth.middleware");

const usuariosController = require("../controllers/usuarios.controller");

//Router for GET users
router.get("/", auth.checkAuth, usuariosController.getAllUser);

//Router for POST User
router.post("/", auth.checkAuth, usuariosController.postUser);

module.exports = router;
