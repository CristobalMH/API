'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UsrSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

UsrSchema.pre('save', function (next) {
  let user = this
  //if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err,salt) =>{
    if (err) return next();

    bcrypt.hash(user.password, salt, null, (err, hash) =>{
      if (err) return next();

      user.password = hash;
      next();
    })
  })
})

UsrSchema.methods.gravatar = function(){
  if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro';

  const md5 = crypto.creatHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s200&d=retro`;
}

module.exports = mongoose.model('User', UsrSchema);
