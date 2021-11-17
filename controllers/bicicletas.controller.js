const Bicicleta = require("../models/bicicletas.model");

let response = {
  msg: "",
  exito: false,
};

// CREATE
exports.create = function (req, res) {
  let bicicleta = new Bicicleta({
    codigo: req.body.codigo,
    modelo: req.body.modelo,
    placa: req.body.placa,
    rim: req.body.rim,
    llanta: req.body.llanta,
    velocidades: req.body.velocidades,
  });

  bicicleta.save(function (err) {
    if (err) {
      (console.log = false),
        (response.exito = false),
        (response.msg = "error al guardar producto");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "el producto se guardo correctamente");
    res.json(response);
  });
};

// READ
exports.find = function (req, res) {
  Bicicleta.find(function (err, bicicletas) {
    res.json(bicicletas);
  });
};

exports.findOne = function (req, res) {
  Bicicleta.findOne({ _id: req.params.id }, function (err, bicicleta) {
    res.json(bicicleta);
  });
};

// UPDATE
exports.update = function (req, res) {
  let bicicleta = {
    codigo: req.body.codigo,
    modelo: req.body.modelo,
    placa: req.body.placa,
    rim: req.body.rim,
    llanta: req.body.llanta,
    velocidades: req.body.velocidades,
  };

  Bicicleta.findByIdAndUpdate(
    req.params.id,
    { $set: bicicleta },
    function (err) {
      if (err) {
        (console.log = false),
          (response.exito = false),
          (response.msg = "error al modificar el producto");
        res.json(response);
        return;
      }

      (response.exito = true),
        (response.msg = "el producto se modifico correctamente");
      res.json(response);
    }
  );
};

// DELETE
exports.remove = function (req, res) {
  Bicicleta.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      (console.error = false),
        (response.exito = false),
        (response.msg = "error al eliminar el producto");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "el producto se elimino correctamente");
    res.json(response);
  });
};
