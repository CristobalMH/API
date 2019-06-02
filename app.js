//declaramos a un usuario
//utilizamo funcionalidades de Ecmascript 6
'use strict'

//Cargamso los modulos de express, bodyParser y hbs
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

//LLamamos a express para crear el servidor
const app = express();

//lamamos a API
const api = require('./routes');

//carga el midleware un metodo que se ejecuta antes de que llegue a un controlador
//Se configura bodyParser para que de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api', api);

app.get('/login', (req, res) =>{
  res.render('login');
})

app.get('/player', (req, res) =>{
  res.render('player');
})

module.exports = app;
