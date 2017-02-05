'use strict';
const GooglePassportOauthStrategy = require('passport-google-oauth20').Strategy;
const User = require('stories-map-models').User;

let expressHost = process.env.NODE_ENV === 'development' || 'dev' ? `//localhost:${process.env.PORT}` : '';

const googlePassportOauthStrategy =  new GooglePassportOauthStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${expressHost}/auth/login/google/return`,
    scope: ['profile', 'email']
  },
  (accessToken, refreshToken, profile, cb) => {

    User.findOne({ googleId: profile.googleId }, (err, user) => {

      if (err) return console.error(`Error : ${err}`);

      if (!user) {
        User.create({
          displayName: profile.displayName,
          name: profile.name,
          googleId: profile.id,
          providers: ['google']
        }, (err) => {
          if (err) return console.error(`Error : ${err}`);

          return cb(null, profile);

        });
      } else if (user) {
        return cb(null, user);
      }
    });

  }
);

module.exports = googlePassportOauthStrategy;
