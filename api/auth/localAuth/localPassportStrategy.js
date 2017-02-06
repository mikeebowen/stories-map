'use strict';

const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('stories-map-models').User;

function localAuth(passport) {
  passport.use('basic', new BasicStrategy({}, (username, password, callback) => {
    User.findOne.$where('basic.email' === username || 'username' === username)
    .then((user) => {

    })
    .catch((err) => {
      console.error(err);
    })
  }));

}

module.exports = exports = localAuth;

