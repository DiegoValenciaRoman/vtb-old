let Cliente = require('../models/cliente');

let crearCliente = function (req, res) {
  
  let body = req.body;

  let cliente = new Cliente({
    nombre: body.nombre,
    apellido: body.apellido,
    rut: body.rut,
    direccion: body.direccion,
    nroContacto: body.nroContacto,
    correo: body.correo
  });

  cliente.save((err, clienteDB) => {
    
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: err.message
      });
    }

    if (!clienteDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se ha guardado el cliente'
        }
      });
    }

    res.json({
      ok: true,
      clienteDB,
    });

  })

}

let getClientes = function (req, res) {
  
  Cliente.find({status:true}, (err, clientesDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      clientesDB,
    });
  });   

}

let getCliente = function (req, res) {
  
  let id = req.params.id;

  Cliente.findById(id, (err, clienteDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      clienteDB,
    });
  })

}

let actualizarCliente = function (req, res) {
  
  let id = req.params.id;
  let body = req.body;

  Cliente.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, clienteDB) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      clienteDB,
    });

  })

}

let borrarCliente = function (req,res) {
  
  let id = req.params.id;
  let cambiaStatus = {
    status: false
  }

  Cliente.findByIdAndUpdate(id, cambiaStatus, { new: true }, (err, clienteDB) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      clienteDB,
    });

  });

}




module.exports = {
  crearCliente,
  getClientes,
  getCliente,
  actualizarCliente,
  borrarCliente
}