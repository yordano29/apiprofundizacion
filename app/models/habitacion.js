const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipoAtencion = require('../models/tipoatencion')
const Clinica = require('../models/clinica')

const HabitacionSchema = new Schema({
  capacidad:{  type: Number,required: true} ,
  estado:{  type: Boolean,required: true} ,
  piso:{  type: Number,required: true} ,
  tipoatencion: {type: Schema.Types.ObjectId, ref: TipoAtencion, required: true},
  clinica: {type: Schema.Types.ObjectId, ref: Clinica, required: true},
});

mongoose.model('Habitacion', HabitacionSchema);