const Accesorio = require("../models/accesorios.model");

let response = {
  msg: "",
  exito: false,
};

// CREATE
exports.create = function (req, res) {
  let accesorio = new Accesorio({
    codigo: req.body.codigo,
    accesorio_bc: req.body.accesorio_bc,
    precio: req.body.precio,
    
  });

 accesorio.save(function (err) {
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
  Accesorio.find(function (err, accesorios) {
    res.json(accesorios);
  });
};

exports.findOne = function (req, res) {
  Accesorio.findOne({ _id: req.params.id }, function (err, accesorio) {
    res.json(accesorio);
  });
};

// UPDATE
exports.update = function (req, res) {
  let accesorio = {
    codigo: req.body.codigo,
    accesorio_bc: req.body.accesorio_bc,
    precio: req.body.precio,
     
  };

  Accesorio.findByIdAndUpdate(
    req.params.id,
    { $set: accesorio },
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
  Accesorio.findByIdAndRemove({ _id: req.params.id }, function (err) {
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
