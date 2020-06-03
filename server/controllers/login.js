const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let Usuario = require('../models/usuario');


let login = function (req, res) {
  
  let body = req.body;

  Usuario.findOne({ rut: body.rut }, (err, usuarioDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!usuarioDB || usuarioDB.status=='desactivado') {
      return res.status(400).json({
        ok: false,
        err: {
          message: '(Usuario) o contraseña incorrectos'
        }
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o (contraseña) incorrectos'
        }
      });
    }

    let token = jwt.sign({
      _id: usuarioDB._id,
      name: usuarioDB.name,
      rut: usuarioDB.rut,
      role: usuarioDB.role,
      status: usuarioDB.status,
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    })

  })

}



module.exports = {
  login
}