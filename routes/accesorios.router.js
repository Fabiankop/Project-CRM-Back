const express = require("express");
const router = express.Router();
const accesoriosController = require("../controllers/accesorios.controller");

// RUTAS CRUD
router.post("/", accesoriosController.create);
router.get("/", accesoriosController.find);
router.get("/:id", accesoriosController.findOne);
router.put("/:id", accesoriosController.update);
router.delete("/:id", accesoriosController.remove);

module.exports = router;