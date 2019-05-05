const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipoAtencionSchema = new Schema({
    descripcion:{  type: String,unique: true,required: true}  
});

mongoose.model('TipoAtencion', TipoAtencionSchema);