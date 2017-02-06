'use strict';
/**
 * @module User model
 * @exports local_modules/models/user/User.js
 */

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

/**
 * @todo Create functions to user schema to salt passwords
 * @todo Create password field in user schema
 */

const userSchema = mongoose.Schema({
  displayName: String,
  userName: {
    type: String,
    unique: true
  },
  name: {
    familyName: String,
    givenName: String
  },
  providers: Array,
  googleId: String,
  basic: {
    email: {
      type: String,
      unique: true
    },
    password: String
  }
});

userSchema.savePassword = (password, callback) => {
  bcrypt.hash(password, 8)
  .then((hash) => {
    callback(null, hash);
  })
  .catch((error) => {
    callback(new Error(error));
  });
};

userSchema.checkPassword = (password, callback) => {
  bcrypt.compare(password, this.basic.password)
  .then(function(res) {
    callback(null, res);
  })
  .catch((error) => {
    callback(new Error(error));
  });
};

module.exports = exports = mongoose.model('User', userSchema);
