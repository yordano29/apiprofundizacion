const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const TipoUsuario = mongoose.model('TipoUsuario');
const service = require('../services/usuarioService');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/', router);
};

  router.post('/usuario',(req, res, next) => {
    let usuario = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      tipousuario: req.body.tipousuario
    })
  
    usuario.save(err => {
      if(err) return res.status(500).send({ message: 
        `Error al crear el usuario: ${err}`})
  
      return res.status(200).send({ token: service.createToken(usuario) })
    })
  });

  
  router.get('/usuario', auth,(req, res, next) => {
    Usuario.find((err, usuario) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!usuario) return res.status(404).send({message: 'No existe el usuario'})     
      TipoUsuario.populate(usuario, {path: "tipousuario", select: "descripcion"}, function(err, usuario){
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        res.status(200).send({ usuario })
      })      
    });
  });


  router.get('/usuario/:usuarioId', auth,(req, res, next) => {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, usuario) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!usuario) return res.status(404).send({message: `El usuario no existe`})
      TipoUsuario.populate(usuario, {path: "tipousuario", select: "descripcion"}, function(err, usuario){
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        res.status(200).send({ usuario })
      })
    })
  });
  
  

  router.put('/usuario/:usuarioId',auth,(req, res, next) => {
    let usuarioId = req.params.usuarioId
    
    let usuarioUpdate= req.body
  
    Usuario.findByIdAndUpdate(usuarioId, usuarioUpdate,(err, usuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ usuario: usuarioStored })
    })
  });

  router.delete('/usuario/:usuarioId',auth,(req, res, next) => {
    let usuarioId = req.params.usuarioId    
    Usuario.findByIdAndRemove(usuarioId, (err, usuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ usuario: usuarioStored })
    })
  });
  

  router.post('/signin',(req, res, next) => {
    Usuario.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({ message: 
        `Error al ingresar: ${err}` })
      if (!user) return res.status(404).send({ message: 
        `No existe el usuario: ${req.body.email}` })
  
      return user.comparePassword(req.body.password,
         (err, isMatch) => {
        if (err) return res.status(500).send(
          { message: `Error al ingresar: ${err}` })
        if (!isMatch) return res.status(404).send(
          { message: `Error de contraseña: ${req.body.email}` })
  
        req.user = user
        return res.status(200).send({ message: 
          'Te has logueado correctamente', 
          token: service.createToken(user) })
      });      
    }).select('_id email password');
  
    });