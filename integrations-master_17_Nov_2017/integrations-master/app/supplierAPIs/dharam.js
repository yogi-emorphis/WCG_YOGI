'use strict';

/**
 * File to integrate Dharam Diamonds API
 */

const { Supplier } = require('../models/index').db();
const APICall = require('../helpers/APICall');
const APIHandlers = require('../helpers/APIHandlers');
const { checkDiamond } = require('../helpers/saveDiamond');
const rp = require('request-promise');

/**
 * Function that maps the data of a row to the correct fields for the database
 * @param {Object} data
 */
const mapDharamFields = function (data) {
  if (!data) {
    return Promise.reject(new Error('Missing values.'));
  }

  // fields we need to manually create
  const rapaportValue = data.RapRate * data.Size;

  const diamondObj = {
    supplierStockId: data.Ref,
    shape: data.Shape,
    carats: data.Size,
    clarity: data.Clarity,
    cut: data.Cut,
    polish: data.Polish,
    symmetry: data.Sym,
    flouresenceIntensity: data.Flour,
    depth: data.Depth,
    color: data.Color,
    rapaportRate: data.RapRate,
    rapaportValue,
    rapaportDiscount: data.Disc,
    rateWithDiscount: data['Price/Carat'],
    valueWithDiscount: data.Rate,
    lab: data.Cert,
    certificateNumber: data.CertNo,
    girdle: data.Girdle,
    girdleCondition: data.GirdleCondition,
    lowerGirdle: data.LowerHalf,
    pavilionDepth: data.PavDepth,
    pavilionAngle: data.PavAngle,
    location: data.Location,
    table: data.Table,
    tableNatts: data.Natts,
    tableInclusion: data.TableInclusion,
    starLength: Number(data.StarLength),
    eyeClean: data.EyeClean,
    brown: data.Browness,
    milky: data.Milky,
    comments: data.comment,
    laserInscription: data.LaserInscription.toString(),
    image: data.ImageURL,
    v360: data.VideoURL,
    certificateLink: data.CertPDFURL,
    status: data.Status,
  };

  return Promise.resolve(diamondObj);
};

/**
 * Function that handles the response and fires the insertion
 * @param {JSON} data
 * @param {Int} ID of the supplier
 */
const handleResponse = function (data, supplierId) {
  if (!data || !supplierId) {
    return Promise.reject(new Error('Missing values.'));
  }

  // return data.DataList
  return APIHandlers.JSONObject(data.DataList, supplierId, mapDharamFields, checkDiamond);
};

/**
 * Function that calls the API, and creates/updates new API call.
 */
const callDharamAPI = function () {
  let dharam;
  let call;

  return Supplier.findOne({ where: { name: 'Dharam' } })
    .then(supplier => {
      dharam = supplier;
      return APICall.createAPICall(dharam.id);
    })
    .then(result => {
      call = result;
      // looking for the authentication details (:
      return rp({
        uri: dharam.apiUrl,
        method: 'POST',
        json: true,
        body: {
          username: dharam.apiUsername,
          uniqID: 18734,
          company: 'Taylor and Hart',
          actCode: 'Taylor@18#98$',
          selectAll: 'all',
          columns: '',
          finder: '',
          sort: '',
        },
      });
    })
    .then(results => handleResponse(results, dharam.id))
    .then(() => APICall.updateAPICall(call, dharam.id))
    .then(() => console.log('Finished calling API.'));
};

module.exports = {
  mapDharamFields,
  handleResponse,
  callDharamAPI,
};
