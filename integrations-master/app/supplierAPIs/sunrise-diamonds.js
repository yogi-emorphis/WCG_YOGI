/**
 * File to integrate Sunrise Diamonds API
 */

const { Supplier } = require('../models/index').db();
const APICall = require('../helpers/APICall');
const APIHandlers = require('../helpers/APIHandlers');
const rp = require('request-promise');

/**
 * Function that maps the data of a row to the correct fields for the database
 * @param {Object} data
 */
const mapSunriseFields = function (data) {
  if (!data) {
    return Promise.reject(new Error('Missing values.'));
  }

  // fields we need to manually create
  const rateWithDiscount = (data['Rap Price($)'] - (data['Rap Price($)'] * (data['Disc(%)'] / 100)));

  const refNo = data['Ref. No'];
  const image = `http://www.sunrisediamonds.com.hk/img/${refNo}/PR.jpg`;
  let v360;
  let segoma;

  if (data['Other Video']) {
    v360 = data['Other Video'];
  }

  const diamondObj = {
    supplierStockId: data['Ref. No'],
    shape: data.Shape,
    carats: data.Cts,
    clarity: data.Clarity,
    cut: data.Cut,
    polish: data.Polish,
    symmetry: data.Symm,
    flouresenceIntensity: data.Fls,
    length: data.Length,
    width: data.Width,
    depth: data.Depth,
    color: data.Color,
    colorShade: data.Shade,
    rapaportRate: data['Rap Price($)'],
    rapaportValue: data['Rap Amt($)'],
    rapaportDiscount: data['Disc(%)'],
    rateWithDiscount,
    valueWithDiscount: data['Net Amt($)'],
    lab: data.Lab,
    certificateNumber: data['Certi No.'],
    girdle: data['Girdle Type'],
    crownHeight: data['Cr Ht'],
    crownAngle: data['Cr Ang'],
    pavilionHeight: data['Pav Ht'],
    pavilionAngle: data['Pav Ang'],
    location: data.Location,
    keyToSymbols: data['Key To Symbol'],
    table: data['Table(%)'],
    tableInclusion: data['Table Inclusion'],
    image,
    segoma,
    v360,
    certificateLink: '',
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

  return APIHandlers(data, supplierId, mapSunriseFields);
};

/**
 * Function that calls the API, and creates/updates new API call.
 */
const callSunriseAPI = function () {
  let sunrise;
  let call;

  return Supplier.findOne({ where: { name: 'Sunrise Diamonds Ltd' } })
    .then(supplier => {
      sunrise = supplier;
      return APICall.createAPICall(sunrise.id);
    })
    .then(result => {
      call = result;
      return rp({ uri: sunrise.apiUrl, json: true });
    })
    .then(results => handleResponse(results, sunrise.id))
    .then(() => APICall.updateAPICall(call, sunrise.id))
    .then(() => console.log('Finished calling API.'));
};

module.exports = {
  mapSunriseFields,
  handleResponse,
  callSunriseAPI,
};
