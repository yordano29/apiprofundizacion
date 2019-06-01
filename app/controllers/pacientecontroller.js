const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');
const Eps = mongoose.model('Eps');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/', router);
};


router.post('/paciente',auth,(req, res, next) => {
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

  
  router.get('/paciente', auth,(req, res, next) => {
    Paciente.find((err, paciente) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!paciente) return res.status(404).send({message: 'No existe el paciente'})      
      Eps.populate(paciente, {path: "eps", select: "nombre"}, function(err, paciente){
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        res.status(200).send({ paciente })
      }) 
    });
  });


  router.get('/paciente/:pacienteId',auth, (req, res, next) => {
    let pacienteId = req.params.pacienteId
    Paciente.findById(pacienteId, (err, paciente) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!paciente) return res.status(404).send({message: `El paciente no existe`})
      Eps.populate(paciente, {path: "eps", select: "nombre"}, function(err, paciente){
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        res.status(200).send({ paciente })
      }) 
    })
  });
  
  

  router.put('/paciente/:pacienteId',auth,(req, res, next) => {
    let pacienteId = req.params.pacienteId
    
    let pacienteUpdate= req.body
  
    Paciente.findByIdAndUpdate(pacienteId, pacienteUpdate,(err, pacienteStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ paciente: pacienteStored })
    })
  });

  router.delete('/paciente/:pacienteId',auth,(req, res, next) => {
    let pacienteId = req.params.pacienteId    
    Paciente.findByIdAndRemove(pacienteId, (err, pacienteStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ paciente: pacienteStored })
    })
  });