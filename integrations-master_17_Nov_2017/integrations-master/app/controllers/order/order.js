'use strict';

const _ = require('underscore');
const { Order } = require('../../models/index').db();
const { SuccessResponse } = require('../../helpers/responses');
const { getCompleteOrder } = require('./orderUtils');

/**
 * Retrieves a list of the users orders
 * GET /order
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOrder = function (req, res, next) {
  Order.findAll({ order: [['updatedAt', 'DESC']] })
    .then(results =>
      Promise.all(_.map(results, result => getCompleteOrder(result, req.authInfo.id))))
    .then(results => {
      next(new SuccessResponse('Done.', results));
    });
};

module.exports = {
  get: getOrder,
};
