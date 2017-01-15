'use strict';
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const googlePassportStrategy = require('./googlePassportStrategy')();
let ngRoute = process.env.NODE_ENV === 'development' || 'dev' ? '//localhost:4200' : '';

function googleOauth(app) {
  app.use(cookieParser('keyboard cat'));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24
  })
  );
  app.use(passport.initialize()); //initialize passport
  app.use(passport.session()); //restore the session if there is one

  passport.use(googlePassportStrategy);

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  app.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

  app.get('/login/google/return',
    passport.authenticate('google', { failureRedirect: `${ngRoute}/login` }),
    function (req, res) {
      res.redirect(`${ngRoute}/`);
    });

}

module.exports = googleOauth;