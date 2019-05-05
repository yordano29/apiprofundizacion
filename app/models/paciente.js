const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Eps = require('../models/eps')

const PacienteSchema = new Schema({
  identificacion:{  type: String,unique: true,required: true} ,
  nombre:{  type: String,required: true} ,
  apellido:{  type: String,required: true} ,
  eps: {type: Schema.Types.ObjectId, ref: Eps, required: true},
});

mongoose.model('Paciente', PacienteSchema);