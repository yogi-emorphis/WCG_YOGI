const { ApiCall } = require('../models/index').db();

/**
 * This function creates a new API call entry in the database
 *
 */
const createAPICall = function (supplierId) {
  if (!supplierId) {
    return Promise.reject(new Error('Missing supplierId.'));
  }

  return ApiCall.create({
    status: 'starting',
  })
    .then(apiCall => apiCall.setSupplier(supplierId))
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
};

/**
 * This function updates the status of an API call in the database
 */
const updateAPICall = function (apiCall, status) {
  if (!apiCall || !status) {
    return Promise.reject(new Error('Missing values.'));
  }

  const call = apiCall;
  call.status = status;
  return call.save()
    .then(() => Promise.resolve('ApiCall updated.'))
    .catch(error => {
      console.log(error);
      return Promise.reject(error);
    });
};

module.exports = {
  createAPICall,
  updateAPICall,
};
