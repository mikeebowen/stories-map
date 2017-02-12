'use strict';

const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('stories-map-models').User;

const localPassportStrategy = new BasicStrategy({}, (username, password, callback) => {
  User.findOne('basic.email' === username || 'username' === username)
    .then((user) => {

    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = exports = localPassportStrategy;

