'use strict';

const BasicStrategy = require('passport-http').BasicStrategy;
const User = require('stories-map-models').User;

const localPassportStrategy = new BasicStrategy({}, (userName, password, callback) => {
  /**
   * @todo make localPassportStrategy accept both userName and email, currently only accepts userName for authentication
   */
  User.findOne({userName: userName})
    .then((user) => {

      user.checkPassword(password, (err, passwordIsValid) => {
        if (err) callback(err);
        if(!passwordIsValid) callback(new Error('invalid password'));
        if(passwordIsValid) callback(null, user);
      });
    })
    .catch((err) => {
      return console.error(`Error : ${err}`);
    });
});

module.exports = exports = localPassportStrategy;

