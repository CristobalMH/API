'use strict'

const express = require ('express');
const playerCtrls = require('../controllers/player');
const userCtrls = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

//GET (obtenemos todos los player)
api.get('/player', playerCtrls.getPlayers);

//GET (obtenemos el id de un player)
api.get('/player/:playerId', playerCtrls.getPlayer);

//POST (Declaramos a un player)
api.post('/player', playerCtrls.savePlayer
  //console.log(res.body);
  //res.status(200).send({message: 'El producto se ha recibido'});
);

//PUT (actualizamos un player)
api.put('/player/:playerId', playerCtrls.updatePlayer);

//DELETE (eliminamos un player)
api.delete('/player/:playerId', playerCtrls.deletePlayer);

api.post('/singup', userCtrls.singUP);
api.post('/singin', userCtrls.singIn);

//prueba
api.get('/private', auth, (req, res) => {
  res.status(200).send({message: 'Tienes acceso n_n'});
})

module.exports = api;
