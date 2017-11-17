'use strict';

const express = require('express');
const authStrategies = require('../controllers/auth/strategies')();
const supplierController = require('../controllers/supplier/supplier');

const router = express.Router({ mergeParams: true });
let middleware;

/* middleware router level */
if (middleware) {
  router.use(middleware);
}

/**
 * BASE URL: /supplier
 */
const supplierRoutes = function () {
  /**
   * GET /
   */
  router.get(
    '/', authStrategies.authToken,
    (req, res, next) => authStrategies.acl(req, res, next, ['admin']),
    (req, res, next) => supplierController.get(req, res, next)
  );

  /**
   * GET /:id
   */
  router.get(
    '/:id', authStrategies.authToken,
    (req, res, next) => authStrategies.acl(req, res, next, ['admin']),
    (req, res, next) => supplierController.getOne(req, res, next)
  );

  return router;
};

module.exports = supplierRoutes;
