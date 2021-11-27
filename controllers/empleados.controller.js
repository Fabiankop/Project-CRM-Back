const Empleado = require("../models/empleados.model");

let response = {
  msg: "",
  exito: false,
};

// CREATE
exports.create = function (req, res) {
  let empleado = new Empleado({
    nombre: req.body.nombre,
    apellido_p: req.body.apellido_p,
    apellido_m: req.body.apellido_m,
    telefono: req.body.telefono,
    email: req.body.email,
    direccion: req.body.direccion,
  });

  empleado.save(function (err) {
    if (err) {
      (console.log = false),
        (response.exito = false),
        (response.msg = "error al guardar el empleado");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "el empleado se guardo correctamente");
    res.json(response);
  });
};

// READ
exports.find = function (req, res) {
  Empleado.find(function (err, empleados) {
    res.json(empleados);
  });
};

exports.findOne = function (req, res) {
  Empleado.findOne({ _id: req.params.id }, function (err, empleado) {
    res.json(empleado);
  });
};

// UPDATE
exports.update = function (req, res) {
  let empleado = {
    nombre: req.body.nombre,
    apellido_p: req.body.apellido_p,
    apellido_m: req.body.apellido_m,
    telefono: req.body.telefono,
    email: req.body.email,
    direccion: req.body.direccion,
  };

  Empleado.findByIdAndUpdate(req.params.id, { $set: empleado }, function (err) {
    if (err) {
      (console.log = false),
        (response.exito = false),
        (response.msg = "error al modificar el empleado");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "el empleado se modifico correctamente");
    res.json(response);
  });
};

// DELETE
exports.remove = function (req, res) {
  Empleado.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      (console.error = false),
        (response.exito = false),
        (response.msg = "error al eliminar el empleado");
      res.json(response);
      return;
    }

    (response.exito = true),
      (response.msg = "el empleado se elimino correctamente");
    res.json(response);
  });
};
