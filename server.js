'use strict';

require('dotenv-safe').load();
const express = require('express');
const app = express();
const morgan = require('morgan');
const clc = require('cli-color');
const mongoose = require('mongoose');
const compression = require('compression');
const format = require('util').format;
const authRouter = express.Router();
const db = mongoose.connection;

const routes = require('./api/routes');

let port = process.env.PORT;
let serverStartTime = new Date();
let encodedMongoDBPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
let encodedMongoDBUsername = encodeURIComponent(process.env.MONGODB_USERNAME);
let mongoDBPort = process.env.MONGODB_PORT;
let mongoDBDatabase = process.env.MONGODB_DATABASE;
let mongoDBHost = process.env.MONGODB_HOST;
let mongoDBAuthMechanism = 'DEFAULT';
let mongodbURI = format(`mongodb://%s:%s@${mongoDBHost}:${mongoDBPort}/${mongoDBDatabase}?authMechanism=%s`,
  encodedMongoDBUsername, encodedMongoDBPassword, mongoDBAuthMechanism);

mongoose.connect(mongodbURI, {auth:{authdb: mongoDBDatabase}});
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', (callback) => {
  console.log(clc.green('database connection made'));
});

app.use(compression());//use compression
app.use(morgan('combined'));// log errors with morgan
//call routes with express router
routes.auth(authRouter);
app.use('/auth', authRouter);

//error handling
// app.use(function (err, req, res) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(port, () => {
  console.log(clc.cyan(`server started on port ${port} at ${serverStartTime}`));
});
