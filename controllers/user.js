'use scrict'

const User = require('../models/usr');
const services = require('../services');

function singUP(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err)=>{
    if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}`} );

    return res.status(201).send({ token: services.createToken(user) });
  })
}

function singIn(req, res) {
  User.find({ email: req.body.email }, (err, user) =>{
    if (err) return res.status(500).send({ message: err});
    if (!user) return res.status(404).send({ message: 'No existe el ususario'});

    req.user = user;
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: services.createToken(user)
    })
  })
}

module.exports = {
  singUP,
  singIn
}
