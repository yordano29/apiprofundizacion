const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TipoNivel = mongoose.model('TipoNivel');
const auth = require('../middlewares/auth');


module.exports = (app) => {
  app.use('/', router);
};


router.post('/tiponivel',auth,(req, res, next) => {
    let tiponivel = new TipoNivel()
    tiponivel.nivel =req.body.nivel
    tiponivel.descripcion =req.body.descripcion
    tiponivel.save((err, tiponivelStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ tiponivel: tiponivelStored })
    })
  });

  router.get('/tiponivel', auth,(req, res, next) => {
    TipoNivel.find((err, tiponivel) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!tiponivel) return res.status(404).send({message: 'No existe el nivel'})      
      res.status(200).send({ tiponivel })
    });
  });

  router.get('/tiponivel/:tiponivelId', auth,(req, res, next) => {
    let tiponivelId = req.params.tiponivelId
    TipoNivel.findById(tiponivelId, (err, tiponivel) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!tiponivel) return res.status(404).send({message: `El tipo Nivel no existe`})
  
      res.status(200).send({ tiponivel })
    })
  });
  
  router.put('/tiponivel/:tiponivelId',auth,(req, res, next) => {
    let tiponivelId = req.params.tiponivelId
    
    let tiponivelUpdate= req.body
  
    TipoNivel.findByIdAndUpdate(tiponivelId, tiponivelUpdate,(err, tiponivelStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ tiponivel: tiponivelStored })
    })
  });

  router.delete('/tiponivel/:tiponivelId',auth,(req, res, next) => {
    let tiponivelId = req.params.tiponivelId    
    TipoNivel.findByIdAndRemove(tiponivelId, (err, tiponivelStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ tiponivel: tiponivelStored })
    })
  });