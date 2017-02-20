'use strict';

const postUser = require('./post/postUser');

function userRoutes(router){

  router.post('/user', postUser);
}

module.exports = exports = userRoutes;
