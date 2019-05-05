const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipoNivelSchema = new Schema({
    nivel:{  type: Number,unique: true,required: true},
    descripcion:{  type: String,unique: true,required: true}  
});

mongoose.model('TipoNivel', TipoNivelSchema);