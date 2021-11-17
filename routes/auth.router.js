var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");

//Signup
router.post("/signup", authController.singUp);

//Login
router.post("/login", authController.login);
/*
//Logout
router.post("/logout", authController.logout);

//Refresh Token
router.post("/refresh-token", authController.refreshToken); */

module.exports = router;
