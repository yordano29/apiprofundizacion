const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const TipoUsuario = require('../models/tipousuario')

const UsuarioSchema = new Schema({
  nombre:{  type: String,unique: true,required: true} ,
  apellido:{  type: String,unique: true,required: true} ,
  email:{  type: String,unique: true,required: true} ,
  password: { type: String, select: false },
  tipousuario: {type: Schema.Types.ObjectId, ref: TipoUsuario, required: true},
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
});

UsuarioSchema.pre("save",function (next)  {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

UsuarioSchema.methods.comparePassword = 
function (candidatePassword, cb)
 {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  });
}

module.exports = mongoose.model('Usuario', UsuarioSchema);