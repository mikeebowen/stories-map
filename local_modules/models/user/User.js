'use strict';
/**
 * @module User model
 * @exports local_modules/models/user/User.js
 */

const mongoose = require('mongoose');
/**
 * @todo Create functions to user schema to salt passwords
 * @todo Create password field in user schema
 */
const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  displayName: String,
  name: {
    familyName: String,
    givenName: String
  },
  providers: Array,
  googleId: String
});

module.exports = exports = mongoose.model('User', userSchema);
