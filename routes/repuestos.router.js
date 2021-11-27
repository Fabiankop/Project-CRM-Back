const express = require("express");
const router = express.Router();
const repuestosController = require("../controllers/repuestos.controller");

// RUTAS CRUD
router.post("/", repuestosController.create);
router.get("/", repuestosController.find);
router.get("/:id", repuestosController.findOne);
router.put("/:id", repuestosController.update);
router.delete("/:id", repuestosController.remove);

module.exports = router;