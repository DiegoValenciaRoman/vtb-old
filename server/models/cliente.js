const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const clienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es necesario']
  },
  rut: {
    type: String,
    unique: true,
    required: [true, 'El rut es necesario']
  },
  direccion: {
    type: String,
  },
  nroContacto: {
    type: Number,
  },
  correo: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  }
});

clienteSchema.plugin(uniqueValidator, { message: 'El {PATH} ingresado ya se encuentra registrado en el sistema' });
module.exports = mongoose.model('Cliente', clienteSchema);


