const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productoSchema = new Schema({
  id: { type: Number },
  nombre: { type: String },
  precio: { type: Number }
});


module.exports = mongoose.model('Producto', productoSchema);


