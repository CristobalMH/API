'use strict'

const Player = require('../models/player')

function getPlayer (req, res) {
  let playerId = req.params.playerId;

  Player.findById(playerId, (err, player) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!player) return res.status(404).send({message: `El player no existe`})

    res.status(200).send({ player })
  })
}

function getPlayers (req, res) {
  Player.find({}, (err, players) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`});
    if (!players) return res.status(404).send({message: 'No existen players'})

    res.status(200).send({ players })
  })
}

function savePlayer (req, res) {
  console.log('POST /api/player')
  console.log(req.body)

  let player = new Player()
  player.name = req.body.name
  player.role = req.body.role
  player.trophies = req.body.trophies
  player.clan = req.body.clan
  player.cards = req.body.cards

  player.save((err, playerStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ player: playerStored })
  })
}

function updatePlayer (req, res) {
  let playerId = req.params.playerId
  let update = req.body

  Player.findByIdAndUpdate(playerId, update, (err, playerUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el player: ${err}`})

    res.status(200).send({ player: playerUpdated })
  })
}

function deletePlayer (req, res) {
  let playerId = req.params.playerId

  Player.findById(playerId, (err, product) => {
    if (err) res.status(500).send({message: `Error al borrar el player: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el player: ${err}`})
      res.status(200).send({message: 'El player ha sido eliminado'})
    })
  })
}

module.exports = {
  getPlayer,
  getPlayers,
  savePlayer,
  updatePlayer,
  deletePlayer
}
