const bcrypt = require('bcrypt');

let Usuario = require('../models/usuario');


// MIDDLEWARES
let crearUsuario = function (req, res) {
  
  let body = req.body;

  let user = new Usuario({
    name: body.name,
    password: bcrypt.hashSync(body.password, 10),
    rut: body.rut,
    role: body.role
  });

  user.save((err, usuarioDB) => {
    
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        message: err.message
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se ha guardado el usuario'
        }
      });
    }

    res.status(201).json({
      ok: true,
      usuario: usuarioDB
    });

  });

}

let getUsuarios = function (req, res){
  
  // {status: true}
  Usuario.find({}, 'name rut role status').exec((err, usuariosDB) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuariosDB,
    });

  })

}

let getUsuario = function (req, res) {
  
  let id = req.params.id;

  Usuario.findById(id, (err, usuarioDB) => {
   
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuarioDB,
    });
    
  })
}

let actualizarUsuario = function (req, res) {
  
  let id = req.params.id;
  let body = req.body;

  // {new: true, runValidators:true, context:'query' }
  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuarioDB,
    });

  });

}

let borrarUsuario = function (req, res) {
 
  let id = req.params.id;

  let cambiaStatus = {
    status: 'desactivado'
  }

  Usuario.findByIdAndUpdate(id, cambiaStatus, { new: true }, (err, usuarioDB) => {
    
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuarioDB,
    });

  });

}


module.exports = {
  crearUsuario,
  getUsuarios,
  getUsuario,
  actualizarUsuario,
  borrarUsuario
}