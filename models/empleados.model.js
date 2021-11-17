const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpleadosSchema = new Schema({
  nombre: { type: String, require: true, max: 60 },
  apellido_p: { type: String, require: true, max: 40 },
  apellido_m: { type: String, require: true, max: 40 },
  telefono: { type: String, require: true, max: 15 },
  email: { type: String, require: false, max: 60 },
  direccion: { type: String, require: false, max: 150 },
});

module.exports = mongoose.model("empleados", EmpleadosSchema);