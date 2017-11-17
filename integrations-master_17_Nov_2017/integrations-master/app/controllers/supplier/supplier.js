'use strict';

const _ = require('underscore');
const { Supplier } = require('../../models/index').db();
const { SuccessResponse } = require('../../helpers/responses');

/**
 * Retrieves a list of suppliers
 * GET /supplier
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getSupplier = function (req, res, next) {
  Supplier.findAll()
    .then(results => _.map(results, r => r.get({ plain: true })))
    .then(results => {
      next(new SuccessResponse('Done.', results));
    });
};

/**
 * Retrieves a single supplier
 * GET /supplier/:id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getOneSupplier = function (req, res, next) {
  if (req.params.id) {
    Supplier.find({ where: { id: req.params.id } })
      .then(result => {
        if (!result) {
          res.status = 400;
          return next(new Error('Supplier not found.'));
        }
        return next(new SuccessResponse('Done.', result.get({ plain: true })));
      })
      .catch(error => {
        console.log('Error whilst getting supplier: ', error.message);
        res.status = 400;
        return next(new Error('Supplier not found.'));
      });
  } else {
    next(new Error('Missing values.'));
  }
};

module.exports = {
  get: getSupplier,
  getOne: getOneSupplier,
};
