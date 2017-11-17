'use strict';

const express = require('express');
const authStrategies = require('../controllers/auth/strategies')();
const orderController = require('../controllers/order/order');

const router = express.Router({ mergeParams: true });
let middleware;

/* middleware router level */
if (middleware) {
  router.use(middleware);
}

/**
 * BASE URL: /order
 */
const orderRoutes = function () {
  /**
   * GET /
   */
  router.get(
    '/', authStrategies.authToken,
    (req, res, next) => authStrategies.acl(req, res, next, ['customer']),
    (req, res, next) => orderController.get(req, res, next)
  );

  return router;
};

module.exports = orderRoutes;
