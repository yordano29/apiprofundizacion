const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TipoUsuario = require('../models/tipousuario')

const UsuarioSchema = new Schema({
  nombre:{  type: String,unique: true,required: true} ,
  apellido:{  type: String,unique: true,required: true} ,
  correo:{  type: String,unique: true,required: true} ,
  contraseña:{  type: String, required: true} ,
  tipousuario: {type: Schema.Types.ObjectId, ref: TipoUsuario, required: true},
});

mongoose.model('Usuario', UsuarioSchema);