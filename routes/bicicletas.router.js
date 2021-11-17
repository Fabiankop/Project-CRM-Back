const express = require("express");
const router = express.Router();
const bicicletasController = require("../controllers/bicicletas.controller");

// RUTAS CRUD
router.post("/", bicicletasController.create);
router.get("/", bicicletasController.find);
router.get("/:id", bicicletasController.findOne);
router.put("/:id", bicicletasController.update);
router.delete("/:id", bicicletasController.remove);

module.exports = router;

