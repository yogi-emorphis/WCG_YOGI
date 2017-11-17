/**
 * Functions to retrieve the rapaport Price
 */

const { Supplier, Price, HistoricPrice } = require('../models/index').db();
const APICall = require('../helpers/APICall');
const APIHandlers = require('../helpers/APIHandlers');
const rp = require('request-promise');

/**
 * Saves a price object to the database
 * @param {Object} priceObj
 *
 * @returns saved Price Object
 */
const savePrice = function (priceObj) {
  if (!priceObj) {
    return Promise.reject(new Error('Missing values.'));
  }

  return Price.create(priceObj);
};

/**
 * Destroys a price object to the database
 * @param {Object} priceObj
 *
 * @returns null
 */
const removePrice = function (priceObj) {
  if (!priceObj) {
    return Promise.reject(new Error('Missing values.'));
  }

  return priceObj.destroy();
};

/**
 * Moves an existing price to the historic table and inserts
 * a new one
 * @param {Object} price
 * @param {Object} existingPrice
 */
const moveToHistoric = function (price, existingPrice) {
  if (!price || !existingPrice) {
    return Promise.reject(new Error('Missing values.'));
  }

  const copyObj = Object.assign({}, existingPrice.get({ plain: true }));
  delete copyObj.id;
  delete copyObj.createdAt;
  delete copyObj.updatedAt;

  return HistoricPrice.create(copyObj)
    .then(() => removePrice(existingPrice))
    .then(() => savePrice(price))
    .catch(error => {
      console.log('Saving diamond did not work: ', error);
      return Promise.reject(error);
    });
};

const mapRapaportPrice = function (data) {
  if (!data) {
    return Promise.reject(new Error('Missing values.'));
  }

  const priceObj = {
    shape: data.shape,
    color: data.color,
    clarity: data.clarity,
    lowSize: data.low_size,
    highSize: data.high_size,
    caratPrice: data.caratprice,
    date: data.date,
  };

  return Promise.resolve(priceObj);
};

/**
 * Checks if the price exists
 * @param {Object} price - object thats parsed from the data
 */
const checkPrice = function (price) {
  if (!price) {
    return Promise.reject(new Error('Missing values.'));
  }

  return Price.find({
    where: {
      shape: price.shape,
      lowSize: price.lowSize,
      highSize: price.highSize,
      color: price.color,
      clarity: price.clarity,
    },
  })
    .then(result => {
      if (!result) {
        return savePrice(price);
      }

      // check if prices are the same
      if (Number(result.caratPrice) === price.caratPrice) {
        return Promise.resolve(result);
      }

      // the price has changed, so move to historic
      return moveToHistoric(price, result);
    });
};

/**
 * Handles response of the calling of the API
 * @param {Object} data
 * @param {String} supplierId
 */
const handleResponse = function (data, supplierId) {
  if (!data || !supplierId) {
    return Promise.reject(new Error('Missing values.'));
  }

  if (!data.response.header.error_code === 0) {
    return Promise.reject(new Error('Error in API call.'));
  }

  return APIHandlers.JSONObject(data.response.body.price, supplierId, mapRapaportPrice, checkPrice);
};

/**
 * Function that calls the Rapaport API.
 */
const callRapaportAPI = function () {
  let rapaport;
  let call;

  return Supplier.findOne({ where: { name: 'Rapaport' } })
    .then(supplier => {
      rapaport = supplier;
      return APICall.createAPICall(rapaport.id);
    })
    .then(result => {
      call = result;

      const options = {
        uri: rapaport.apiUrl,
        method: 'POST',
        body: JSON.stringify({
          request: {
            header: { username: rapaport.apiUser, password: rapaport.apiPassword },
            body: { shape: '' },
          },
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        json: true,
      };

      return rp(options);
    })
    .then(results => handleResponse(results, rapaport.id))
    .then(() => APICall.updateAPICall(call, rapaport.id))
    .then(() => console.log('Finished calling API.'));
};

module.exports = {
  savePrice,
  removePrice,
  moveToHistoric,
  checkPrice,
  handleResponse,
  callRapaportAPI,
};
