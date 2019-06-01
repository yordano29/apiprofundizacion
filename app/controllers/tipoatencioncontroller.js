const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TipoAtencion = mongoose.model('TipoAtencion');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/tipoatencion',auth,(req, res, next) => {
    let tipoatencion = new TipoAtencion()
    tipoatencion.descripcion =req.body.descripcion
    tipoatencion.save((err, tipoatencionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ tipoatencion: tipoatencionStored })
    })
  });

  router.get('/tipoatencion', auth,(req, res, next) => {
    TipoAtencion.find((err, tipoatencion) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!tipoatencion) return res.status(404).send({message: 'No existe el tipo de atencion'})      
      res.status(200).send({ tipoatencion })
    });
  });

  router.get('/tipoatencion/:tipoatencionId', auth,(req, res, next) => {
    let tipoatencionId = req.params.tipoatencionId
    TipoAtencion.findById(tipoatencionId, (err, tipoatencion) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!tipoatencion) return res.status(404).send({message: `El tipo Atencion no existe`})
  
      res.status(200).send({ tipoatencion })
    })
  });
  
  router.put('/tipoatencion/:tipoatencionId',auth,(req, res, next) => {
    let tipoatencionId = req.params.tipoatencionId
    
    let tipoatencionUpdate= req.body
  
    TipoAtencion.findByIdAndUpdate(tipoatencionId, tipoatencionUpdate,(err, tipoatencionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ tipoatencion: tipoatencionStored })
    })
  });

  router.delete('/tipoatencion/:tipoatencionId',auth,(req, res, next) => {
    let tipoatencionId = req.params.tipoatencionId    
    TipoAtencion.findByIdAndRemove(tipoatencionId, (err, tipoatencionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ tipoatencion: tipoatencionStored })
    })
  });