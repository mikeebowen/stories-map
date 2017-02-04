'use strict';

const mongoose = require('mongoose');

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
