const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Paciente = require('../models/paciente')
const Habitacion = require('../models/habitacion')

const PacienteHabitacionSchema = new Schema({
  fechaingreso:{  type: Date,required: true} ,
  fechasalida:{  type: Date,} ,
  paciente: {type: Schema.Types.ObjectId, ref: Paciente, required: true},
  habitacion: {type: Schema.Types.ObjectId, ref: Habitacion, required: true},
});

mongoose.model('PacienteHabitacion', PacienteHabitacionSchema);