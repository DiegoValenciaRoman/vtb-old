const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let rolesValidos = {
  values: ['ADMIN_ROLE', 'VENDEDOR_ROLE', 'MECANICO_ROLE'],
  message: '{VALUE} no es un rol válido'
};

const usuarioSchema = new Schema({
  
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  rut: {
    type: String,
    unique: true,
    required: [true, 'El rut es necesario']
  },
  role: {
    type: String,
    enum: rolesValidos,
    default: 'VENDEDOR_ROLE'
  },
  status: {
    type: String,
    default: 'activo'
  }
  
});

// Evita retornar la propiedad 'password'
usuarioSchema.methods.toJSON = function () {

  let user = this;
  let userObject = user.toObject();

  delete userObject.password;

  return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', usuarioSchema);
