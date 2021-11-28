const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BicicletasSchema = new Schema({
  codigo: { type: String, require: true, max: 60 },
  modelo: { type: String, require: true, max: 40 },
  placa: { type: String, require: true, max: 40 },
  rim: { type: String, require: true, max: 15 },
  llanta: { type: String, require: false, max: 60 },
  velocidades: { type: String, require: false, max: 150 },
});

module.exports = mongoose.model("bicicletas", BicicletasSchema);
