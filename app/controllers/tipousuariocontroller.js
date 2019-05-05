const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TipoUsuario = mongoose.model('TipoUsuario');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/tipousuario',(req, res, next) => {
    let tipousuario = new TipoUsuario()
    tipousuario.descripcion =req.body.descripcion
    tipousuario.save((err, tipousuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ tipousuario: tipousuarioStored })
    })
  });

  router.get('/tipousuario', (req, res, next) => {
    TipoUsuario.find((err, tipousuario) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!tipousuario) return res.status(404).send({message: 'No existen articulos'})      
      res.status(200).send({ tipousuario })
    });
  });

  router.get('/tipousuario/:tipousuarioId', (req, res, next) => {
    let tipousuarioId = req.params.tipousuarioId
    TipoUsuario.findById(tipousuarioId, (err, tipousuario) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!tipousuario) return res.status(404).send({message: `El tipo usuario no existe`})
  
      res.status(200).send({ tipousuario })
    })
  });
  
  router.put('/tipousuario/:tipousuarioId',(req, res, next) => {
    let tipousuarioId = req.params.tipousuarioId
    
    let tipousuarioUpdate= req.body
  
    TipoUsuario.findByIdAndUpdate(tipousuarioId, tipousuarioUpdate,(err, tipousuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ tipousuario: tipousuarioStored })
    })
  });

  router.delete('/tipousuario/:tipousuarioId',(req, res, next) => {
    let tipousuarioId = req.params.tipousuarioId    
    TipoUsuario.findByIdAndRemove(tipousuarioId, (err, tipousuarioStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ tipousuario: tipousuarioStored })
    })
  });