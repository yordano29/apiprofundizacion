const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipoNivel = require('../models/tiponivel');

const ClinicaSchema = new Schema({
  identificacion:{  type: String,unique: true,required: true} ,
  nombre:{  type: String,required: true} ,
  direccion:{  type: String,required: true} ,
  tiponivel: {type: Schema.Types.ObjectId, ref: TipoNivel, required: true},
});

mongoose.model('Clinica', ClinicaSchema);