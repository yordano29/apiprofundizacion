const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpsSchema = new Schema({
    nombre:{  type: String,unique: true,required: true},
    categoria:{  type: String,required: true}
});

mongoose.model('Eps', EpsSchema);