const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PacienteHabitacion = mongoose.model('PacienteHabitacion');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/pacientehabitacion',(req, res, next) => {
    let pacientehabitacion = new PacienteHabitacion()
    pacientehabitacion.fechaingreso =req.body.fechaingreso
    pacientehabitacion.fechasalida =req.body.fechasalida
    pacientehabitacion.paciente =req.body.paciente    
    pacientehabitacion.habitacion =req.body.habitacion
    pacientehabitacion.save((err, pacientehabitacionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ pacientehabitacion: pacientehabitacionStored })
    })
  });

  
  router.get('/pacientehabitacion', (req, res, next) => {
    PacienteHabitacion.find((err, pacientehabitacion) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!pacientehabitacion) return res.status(404).send({message: 'No existe el pacientehabitacion'})      
      res.status(200).send({ pacientehabitacion })
    });
  });


  router.get('/pacientehabitacion/:pacientehabitacionId', (req, res, next) => {
    let pacientehabitacionId = req.params.pacientehabitacionId
    PacienteHabitacion.findById(pacientehabitacionId, (err, pacientehabitacion) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!pacientehabitacion) return res.status(404).send({message: `El pacientehabitacion no existe`})
  
      res.status(200).send({ pacientehabitacion })
    })
  });
  
  

  router.put('/pacientehabitacion/:pacientehabitacionId',(req, res, next) => {
    let pacientehabitacionId = req.params.pacientehabitacionId
    
    let pacientehabitacionUpdate= req.body
  
    PacienteHabitacion.findByIdAndUpdate(pacientehabitacionId, pacientehabitacionUpdate,(err, pacientehabitacionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ pacientehabitacion: pacientehabitacionStored })
    })
  });

  router.delete('/pacientehabitacion/:pacientehabitacionId',(req, res, next) => {
    let pacientehabitacionId = req.params.pacientehabitacionId    
    PacienteHabitacion.findByIdAndRemove(pacientehabitacionId, (err, pacientehabitacionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ pacientehabitacion: pacientehabitacionStored })
    })
  });