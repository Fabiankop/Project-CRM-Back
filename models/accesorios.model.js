const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccesoriosSchema = new Schema({
  codigo: { type: String, require: true, max: 60 },
  accesorio_bc: { type: String, require: true, max: 40 },
  precio: { type: String, require: true, max: 40 },
  
});

module.exports = mongoose.model("accesorios", AccesoriosSchema);