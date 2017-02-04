'use strict';
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const googlePassportStrategy = require('./googlePassportStrategy/googlePassportStrategy')();
let ngRoute = process.env.NODE_ENV === 'development' || 'dev' ? '//localhost:4200' : '';
let session_secret = process.env.SESSION_SECRET;
let mongoUri = process.env.MONGOLAB_URI;
// session storage settings
const store = new MongoDBStore({
  uri: mongoUri,
  collection: 'userSessions'
});

function googleOauth(app) {
  // use session section with cookieParser
  app.use(cookieParser(session_secret));
  //set the session storage settings
  app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 8,
    unset: 'destroy',
    store: store,
    proxy: true
  }));
  // initialize passport
  app.use(passport.initialize());
  // restore the session if there is one
  app.use(passport.session());
  // use the googleOauth strategy
  passport.use(googlePassportStrategy);
  //serialize and deserialize the user session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
  // googleOauth route for verification
  app.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
  // googleOauth callback
  app.get('/login/google/return',
    passport.authenticate('google', { failureRedirect: `${ngRoute}/login` }),
    (req, res) => {
      res.redirect(`${ngRoute}/`);
    });
}

module.exports = googleOauth;
