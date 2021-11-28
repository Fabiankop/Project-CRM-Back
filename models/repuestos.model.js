const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepuestosSchema = new Schema({
  codigo: { type: String, require: true, max: 60 },
<<<<<<< HEAD
 repuestos_bc: { type: String, require: true, max: 40 },
  precio: { type: Number, require: true, max: 40 },
=======
 repuesto_bc: { type: String, require: true, max: 40 },
  precio: { type: String, require: true, max: 40 },
>>>>>>> 83b6915077abfe8d20abf679822065ddebbb7755
  
});

module.exports = mongoose.model("repuestos", RepuestosSchema);