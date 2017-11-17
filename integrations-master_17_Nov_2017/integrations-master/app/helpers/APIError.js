const { ApiError } = require('../models/index').db();

/**
 * File that takes a json row and stores it in the db
 * if there was an error
 */
const saveError = function (data, supplierId) {
  if (!data || !supplierId) {
    return Promise.reject(new Error('Missing values.'));
  }

  return ApiError.create({
    json: data,
  })
    .then(apiError => apiError.setSupplier(supplierId))
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
};

module.exports = {
  saveError,
};
