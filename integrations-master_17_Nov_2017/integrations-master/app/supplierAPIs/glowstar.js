'use strict';

/**
 * File to integrate Glowstar Diamonds API
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
const mapGlowstarFields = function (data) {
  if (!data) {
    return Promise.reject(new Error('Missing values.'));
  }

  // fields we need to manually create
  const rapaportValue = data.Rap * data.Dcaret;

  const diamondObj = {
    supplierStockId: data.Loat_NO,
    shape: data.Shape,
    carats: data.Dcarat,
    clarity: data.Clarity,
    cut: data.Cut,
    polish: data.Polish,
    symmetry: data.Symmetry,
    flouresenceIntensity: data.Fluorescence,
    depth: data.Depth,
    color: data.Color,
    rapaportRate: data.Rap,
    rapaportValue,
    rapaportDiscount: data.Dcaret,
    rateWithDiscount: data.Dcarat,
    valueWithDiscount: data.NetDollar,
    lab: data.Lab,
    certificateNumber: data.CertiNo,
    girdle: data.Girdle,
    girdleCondition: data['Girdle Condition'],
    lowerGirdle: data['Girdle%'],
    pavilionDepth: data['pav Depth'],
    pavilionAngle: data['pav Angle'],
    location: data.Location,
    table: data.Table,
    tableNatts: data.Natts,
    starLength: data.Length,
    eyeClean: data.EyeC,
    // brown: data.Browness,
    // milky: data.Milky,
    // comments: data.Comment,
    // laserInscription: data.LaserInscription.toString(),
    image: data['DIAMONDIMG_URL'],
    v360: data['VIDEO_URL'],
    certificateLink: data['VIDEO_URL'],
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
  return APIHandlers.JSONObject(data.DataList, supplierId, mapGlowstarFields, checkDiamond);
};

/**
 * Function that calls the API, and creates/updates new API call.
 */
const callGlowStarAPI = function () {
  let glowstar;
  let call;

  return Supplier.findOne({ where: { name: 'Glowstar' } })
    .then(supplier => {
      glowstar = supplier;
      return APICall.createAPICall(glowstar.id);
    })
    .then(result => {
      call = result;
      // looking for the authentication details (:
      return rp({
        uri: glowstar.apiUrl,
        method: 'POST',
        json: true,
        body: {
          username: glowstar.apiUsername,
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
    .then(results => handleResponse(results, glowstar.id))
    .then(() => APICall.updateAPICall(call, glowstar.id))
    .then(() => console.log('Finished calling API.'));
};

module.exports = {
  mapGlowstarFields,
  handleResponse,
  callGlowStarAPI,
};
