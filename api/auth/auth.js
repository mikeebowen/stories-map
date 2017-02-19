'use strict';
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const format = require('util').format;
const MongoDBStore = require('connect-mongodb-session')(session);

const googlePassportStrategy = require('./googleOAuth/googlePassportStrategy');
const localPassportStrategy = require('./localAuth/localPassportStrategy');

let ngRoute = process.env.NODE_ENV === 'development' || 'dev' ? '//localhost:4200' : '';
let session_secret = process.env.SESSION_SECRET;
let encodedMongoDBPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
let encodedMongoDBUsername = encodeURIComponent(process.env.MONGODB_USERNAME);
let mongoDBPort = process.env.MONGODB_PORT;
let mongoDBDatabase = process.env.MONGODB_DATABASE;
let mongoDBHost = process.env.MONGODB_HOST;
let mongoDBAuthMechanism = 'DEFAULT';
let mongodbURI = format(`mongodb://%s:%s@${mongoDBHost}:${mongoDBPort}/${mongoDBDatabase}?authMechanism=%s`,
  encodedMongoDBUsername, encodedMongoDBPassword, mongoDBAuthMechanism);
// session storage settings
const store = new MongoDBStore({
  uri: mongodbURI,
  collection: 'userSessions'
});

function auth(app) {
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
