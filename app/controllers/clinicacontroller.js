const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clinica = mongoose.model('Clinica');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/clinica',(req, res, next) => {
    let clinica = new Clinica()
    clinica.identificacion =req.body.identificacion
    clinica.nombre =req.body.nombre
    clinica.direccion =req.body.direccion    
    clinica.tiponivel =req.body.tiponivel
    clinica.save((err, clinicaStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ clinica: clinicaStored })
    })
  });

  
  router.get('/clinica', (req, res, next) => {
    Clinica.find((err, clinica) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!clinica) return res.status(404).send({message: 'No existe el clinica'})      
      res.status(200).send({ clinica })
    });
  });


  router.get('/clinica/:clinicaId', (req, res, next) => {
    let clinicaId = req.params.clinicaId
    Clinica.findById(clinicaId, (err, clinica) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!clinica) return res.status(404).send({message: `El clinica no existe`})
  
      res.status(200).send({ clinica })
    })
  });
  
  

  router.put('/clinica/:clinicaId',(req, res, next) => {
    let clinicaId = req.params.clinicaId
    
    let clinicaUpdate= req.body
  
    Clinica.findByIdAndUpdate(clinicaId, clinicaUpdate,(err, clinicaStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ clinica: clinicaStored })
    })
  });

  router.delete('/clinica/:clinicaId',(req, res, next) => {
    let clinicaId = req.params.clinicaId    
    Clinica.findByIdAndRemove(clinicaId, (err, clinicaStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ clinica: clinicaStored })
    })
  });