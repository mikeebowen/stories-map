'use strict';

/**
 * @module auth
 * @type {auth}
 */

const auth = require('./auth/auth');
const userRoutes = require('./user/userRoutes');

module.exports = {
  auth,
  userRoutes
};
