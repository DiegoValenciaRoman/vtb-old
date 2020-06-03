const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Persona = mongoose.model('Persona')


const eventoSchema = new Schema({
  id: { type: Number },
  nombre: { type: String },
  fecha: { type: Date },
  lugar: { type: String },
  asistentes: { type: Schema.ObjectId, ref:"Persona" }
});


module.exports = mongoose.model('Evento', eventoSchema);