//declaramos a un usuario
//utilizamo funcionalidades de Ecmascript 6
'use strict'

//Declaramos a mongoose
const mongoose = require('mongoose');

//referencia a app
const app = require ('./app');
const config = require('./config');

//Conexión a la Base de Datos
mongoose.connect(config.db, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(() => {
  app.listen(config.port, () => {
    console.log(`API jalando xD desde localhost:${config.port}`);
  })
  console.log('Conectado a Mongo DB Atlas')})
.catch(err => console.log(err));
