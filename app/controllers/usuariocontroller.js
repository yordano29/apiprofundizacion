const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/usuario',(req, res, next) => {
    let usuario = new Usuario()
    usuario.nombre =req.body.nombre
    usuario.apellido =req.body.apellido
    usuario.correo =req.body.correo
    usuario.contraseña =req.body.contraseña
    usuario.tipousuario =req.body.tipousuario
    usuario.save((err, usuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ usuario: usuarioStored })
    })
  });

  
  router.get('/usuario', (req, res, next) => {
    Usuario.find((err, usuario) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!usuario) return res.status(404).send({message: 'No existe el usuario'})      
      res.status(200).send({ usuario })
    });
  });


  router.get('/usuario/:usuarioId', (req, res, next) => {
    let usuarioId = req.params.usuarioId
    Usuario.findById(usuarioId, (err, usuario) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!usuario) return res.status(404).send({message: `El usuario no existe`})
  
      res.status(200).send({ usuario })
    })
  });
  
  

  router.put('/usuario/:usuarioId',(req, res, next) => {
    let usuarioId = req.params.usuarioId
    
    let usuarioUpdate= req.body
  
    Usuario.findByIdAndUpdate(usuarioId, usuarioUpdate,(err, usuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ usuario: usuarioStored })
    })
  });

  router.delete('/usuario/:usuarioId',(req, res, next) => {
    let usuarioId = req.params.usuarioId    
    Usuario.findByIdAndRemove(usuarioId, (err, usuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ usuario: usuarioStored })
    })
  });