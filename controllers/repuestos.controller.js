const Repuesto = require("../models/repuestos.model");

let response = {
  msg: "",
  exito: false,
};

// CREATE
exports.create = function (req, res) {
  let repuesto = new Repuesto({
    codigo: req.body.codigo,
    repuesto_bc: req.body.repuesto_bc,
    precio: req.body.precio,
    
  });

 repuesto.save(function (err) {
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
  Repuesto.find(function (err, repuestos) {
    res.json(repuestos);
  });
};

exports.findOne = function (req, res) {
  Repuesto.findOne({ _id: req.params.id }, function (err, repuesto) {
    res.json(repuesto);
  });
};

// UPDATE
exports.update = function (req, res) {
  let repuesto = {
    codigo: req.body.codigo,
    repuesto_bc: req.body.repuesto_bc,
    precio: req.body.precio,
     
  };

  Repuesto.findByIdAndUpdate(
    req.params.id,
    { $set: repuesto },
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
  Repuesto.findByIdAndRemove({ _id: req.params.id }, function (err) {
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
