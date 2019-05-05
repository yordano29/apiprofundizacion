const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/paciente',(req, res, next) => {
    let paciente = new Paciente()
    paciente.identificacion =req.body.identificacion
    paciente.nombre =req.body.nombre
    paciente.apellido =req.body.apellido    
    paciente.eps =req.body.eps
    paciente.save((err, pacienteStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ paciente: pacienteStored })
    })
  });

  
  router.get('/paciente', (req, res, next) => {
    Paciente.find((err, paciente) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!paciente) return res.status(404).send({message: 'No existe el paciente'})      
      res.status(200).send({ paciente })
    });
  });


  router.get('/paciente/:pacienteId', (req, res, next) => {
    let pacienteId = req.params.pacienteId
    Paciente.findById(pacienteId, (err, paciente) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!paciente) return res.status(404).send({message: `El paciente no existe`})
  
      res.status(200).send({ paciente })
    })
  });
  
  

  router.put('/paciente/:pacienteId',(req, res, next) => {
    let pacienteId = req.params.pacienteId
    
    let pacienteUpdate= req.body
  
    Paciente.findByIdAndUpdate(pacienteId, pacienteUpdate,(err, pacienteStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ paciente: pacienteStored })
    })
  });

  router.delete('/paciente/:pacienteId',(req, res, next) => {
    let pacienteId = req.params.pacienteId    
    Paciente.findByIdAndRemove(pacienteId, (err, pacienteStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ paciente: pacienteStored })
    })
  });