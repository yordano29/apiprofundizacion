const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Habitacion = mongoose.model('Habitacion');
const TipoAtencion = mongoose.model('TipoAtencion');
const Clinica = mongoose.model('Clinica');
const auth = require('../middlewares/auth');


module.exports = (app) => {
  app.use('/', router);
};


router.post('/habitacion',auth,(req, res, next) => {
    let habitacion = new Habitacion()
    habitacion.capacidad =req.body.capacidad
    habitacion.estado =req.body.estado
    habitacion.piso =req.body.piso    
    habitacion.tipoatencion =req.body.tipoatencion
    habitacion.clinica =req.body.clinica
    habitacion.save((err, habitacionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ habitacion: habitacionStored })
    })
  });

  
  router.get('/habitacion', auth,(req, res, next) => {
    Habitacion.find((err, habitacion) => {
      if (err) return res.status(500).send({message: 
           'Error al realizar la petición: '+err})
      if (!habitacion) return res.status(404).send({message: 'No existe el habitacion'})      
      TipoAtencion.populate(habitacion, {path: "tipoatencion", select: "descripcion"}, function(err, habitacion){
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        

        Clinica.populate(habitacion, {path: "clinica", select: "nombre"}, function(err, habitacion){
          if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
          res.status(200).send({ habitacion })
        }) 
      }) 
    });
  });


  router.get('/habitacion/:habitacionId', auth,(req, res, next) => {
    let habitacionId = req.params.habitacionId
    Habitacion.findById(habitacionId, (err, habitacion) => {
      if (err) return res.status(500).send({message: 
        'Error al realizar la petición: '+ err})
      if (!habitacion) return res.status(404).send({message: `El habitacion no existe`})
      TipoAtencion.populate(habitacion, {path: "tipoatencion", select: "descripcion"}, function(err, habitacion){
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        

        Clinica.populate(habitacion, {path: "clinica", select: "nombre"}, function(err, habitacion){
          if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
          res.status(200).send({ habitacion })
        }) 
      }) 
    })
  });
  
  

  router.put('/habitacion/:habitacionId',auth,(req, res, next) => {
    let habitacionId = req.params.habitacionId
    
    let habitacionUpdate= req.body
  
    Habitacion.findByIdAndUpdate(habitacionId, habitacionUpdate,(err, habitacionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})
  
      res.status(200).send({ habitacion: habitacionStored })
    })
  });

  router.delete('/habitacion/:habitacionId',auth,(req, res, next) => {
    let habitacionId = req.params.habitacionId    
    Habitacion.findByIdAndRemove(habitacionId, (err, habitacionStored) => {
      if (err) res.status(500).send({message: 
        `Error al salvar en la base de datos: ${err} `})  
      res.status(200).send({ habitacion: habitacionStored })
    })
  });