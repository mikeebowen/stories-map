'use strict';
const passport = require('passport');

const googlePassportStrategy = require('./googleOAuth/googlePassportStrategy');
const localPassportStrategy = require('./localAuth/localPassportStrategy');

let ngRoute = process.env.NODE_ENV === 'development' || 'dev' ? '//localhost:4200' : '';

function auth(app) {

  // use the googleOAuth strategy
  passport.use(googlePassportStrategy);
  passport.use('basic', localPassportStrategy);
  //serialize and deserialize the user session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
  // googleOAuth route for verification
  app.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
  // googleOAuth callback
  app.get('/login/google/return',
    passport.authenticate('google', { failureRedirect: `${ngRoute}/login` }),
    (req, res) => {
      res.redirect(`${ngRoute}/`);
    });

  app.get('/login/local', passport.authenticate('basic', { scope: ['profile']}), (req, res) => {
    if (req.isAuthenticated()) res.redirect(`${ngRoute}/`);
    else res.redirect(`${ngRoute}/login`);
  });
}

module.exports = auth;
