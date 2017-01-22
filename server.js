'use strict';

require('dotenv-safe').load();
const express = require('express');
const app = express();
const morgan = require('morgan');
const clc = require('cli-color');
const compression = require('compression');
const authRouter = express.Router();
const srv = require('./srv');
let port = process.env.PORT;
let serverStartTime = new Date();

app.use(compression());//use compression
app.use(morgan('combined'));// log erros with morgan
//call routes with express router
srv.auth.googleOauth(authRouter);
app.use('/auth', authRouter);






//error handling
app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(clc.cyan(`server started on port ${port} at ${serverStartTime}`));
});
