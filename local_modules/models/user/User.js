'use strict';
/**
 * @module User model
 * @exports local_modules/models/user/User.js
 */

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  displayName: String,
  userName: {
    type: String,
    unique: true,
    required: true
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
    password: {
      type: String,
      set: (pw) => {
        return bcrypt.hashSync(pw, 10);
      }
    }

  }
});

/**
 *@todo create async method to generate password hash
 */

/**
 * @method checkPassword
 * checks a users password against the hash stored in the database with bcrypt
 * @param {string} pw - the password to be checked
 * @param {function} callback - a callback function to be called with either the response from the comparison or an error
 */

userSchema.methods.checkPassword = function (pw, callback) {
  bcrypt.compare(pw, this.basic.password)
    .then((res) => {
      callback(null, res);
    })
    .catch((error) => {
      callback(new Error(error));
    });
};

module.exports = exports = mongoose.model('User', userSchema);
