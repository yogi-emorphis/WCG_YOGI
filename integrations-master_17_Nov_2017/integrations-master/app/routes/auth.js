'use strict';

const express = require('express');
const oauth2 = require('../controllers/auth/oauth2')();
const authStrategies = require('../controllers/auth/strategies')();

const router = express.Router({ mergeParams: true });
let middleware;

/* params router level */
router.param('id', (req, res, next, id) => {
  if (/^\d+$/.test(id)) {
    next();
  } else {
    next('route');
  }
});

/* middleware router level */
if (middleware) {
  router.use(middleware);
}

/**
 * Routes to authenticate
 */
const authRoutes = function () {
  router.post('/login', oauth2);

  router.get('/check', authStrategies.authToken, (req, res, next) => {
    next('OK');
  });

  return router;
};

module.exports = authRoutes;
