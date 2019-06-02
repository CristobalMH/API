'use scrict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creamos el shema PlayersSchema con sus campos
const PlayerSchema = Schema({
  name: String,
  role: { type: String, enum: ['Lead', 'Colider', 'Veteran', 'Member'] },
  trophies: Number,
  clan: String,
  cards: Number
})

//exportamos este modelo con nombre Players del schema que utilizamos
module.exports = mongoose.model('Player', PlayerSchema);
