'use strict';
const GooglePassportOauthStrategy = require('passport-google-oauth20').Strategy;
const User = require('stories-map-models').User;

let expressHost = process.env.NODE_ENV === 'development' || 'dev' ? `//localhost:${process.env.PORT}` : '';

const googlePassportOauthStrategy =  new GooglePassportOauthStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${expressHost}/auth/login/google/return`,
    scope: ['profile', 'email']
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log('token', profile);
    /*User.findOne({ googleId: profile.googleId }, (err, user) => {
      if (err) return console.log(`Error : ${err}`)
      if (!user) {
        User.create({
          displayName: profile.displayName,
          givenName: profile.givenName,
          familyName: profile.familyName,
          emails: profile.emails,
          googleId: profile.id
        }, (err) => {
          if (err) return console.log(`Error : ${err}`)
          return cb(null, profile);

        });
      } else if (user) {
        return cb(null, profile);
      }
    })*/

    return cb(null, profile);
  });

module.exports = googlePassportOauthStrategy;
