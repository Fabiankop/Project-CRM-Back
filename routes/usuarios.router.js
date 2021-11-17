const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios.controller");

//Router for GET users
router.get("/", usuariosController.getAllUser);

//Router for POST User
router.post("/", usuariosController.postUser);

module.exports = router;
