const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Eps = mongoose.model('Eps');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/eps',(req, res, next) => {
    let eps = new Eps()
    eps.nombre =req.body.nombre
    eps.categoria =req.body.categoria
    eps.save((err, epsStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ eps: epsStored })
    })
  });

  router.get('/eps', (req, res, next) => {
    Eps.find((err, eps) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!eps) return res.status(404).send({message: 'No existe la Eps'})      
      res.status(200).send({ eps })
    });
  });

  router.get('/eps/:epsId', (req, res, next) => {
    let epsId = req.params.epsId
    Eps.findById(epsId, (err, eps) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!eps) return res.status(404).send({message: `la Eps no existe`})
  
      res.status(200).send({ eps })
    })
  });
  
  router.put('/eps/:epsId',(req, res, next) => {
    let epsId = req.params.epsId
    
    let epsUpdate= req.body
  
    Eps.findByIdAndUpdate(epsId, epsUpdate,(err, epsStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ eps: epsStored })
    })
  });

  router.delete('/eps/:epsId',(req, res, next) => {
    let epsId = req.params.epsId    
    Eps.findByIdAndRemove(epsId, (err, epsStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ eps: epsStored })
    })
  });