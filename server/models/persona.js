const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personaSchema = new Schema({
  id: { type: Number },
  nombre: { type: String },
  apellido: { type: Number }
});


module.exports = mongoose.model('Persona', personaSchema);
