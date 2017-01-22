'use strict';
const Strategy = require('passport-google-oauth20').Strategy;
let expressHost = process.env.NODE_ENV === 'development' || 'dev' ? `//localhost:${process.env.PORT}` : '';

module.exports = function () {
  return new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${expressHost}/auth/login/google/return`,
    scope: ['profile', 'email']
  },
    function (accessToken, refreshToken, profile, cb) {
      console.log('token', profile);
      return cb(null, profile);

      /*User.findOne({ googleId: profile.id }, (err, user) => {
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
    });
};
