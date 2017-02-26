'use strict';

require('dotenv-safe').load();
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const clc = require('cli-color');
const mongoose = require('mongoose');
const compression = require('compression');
const format = require('util').format;
const authRouter = express.Router();
const userRouter = express.Router();
const db = mongoose.connection;

const routes = require('./api/routes');

let port = process.env.PORT;
let serverStartTime = new Date();
const session_secret = process.env.SESSION_SECRET;
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

mongoose.connect(mongodbURI, {auth:{authdb: mongoDBDatabase}});
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', (callback) => {
  console.log(clc.green('database connection made'));
});
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
app.use(compression());//use compression
app.use(morgan('combined'));// log errors with morgan
//call routes with express router
routes.auth(authRouter);
routes.userRoutes(userRouter);
app.use('/auth', authRouter);
app.use('/api', userRouter);

//error handling
// app.use(function (err, req, res) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(port, () => {
  console.log(clc.cyan(`server started on port ${port} at ${serverStartTime}`));
});
