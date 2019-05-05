const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipoUsuarioSchema = new Schema({
    descripcion:{  type: String,unique: true,required: true}
  
});

mongoose.model('TipoUsuario', TipoUsuarioSchema);