'use strict';

const version = 0.1; // API version
const meta = {
  version,
};

const AuthResponse = function (text, status, authError) {
  this.statusText = text;
  this.status = status;
  this.authError = authError;
  this.meta = meta;
};

const ErrorResponse = function (err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(err);
  let errMess;
  if (err.message) {
    errMess = err.message;
  } else {
    errMess = err;
  }
  res.json({
    status: res.statusCode || 500, statusText: errMess, meta, errors: err.errors,
  });
};

const SuccessResponse = function (statusText, data) {
  this.statusText = statusText;
  this.data = data;
  this.meta = meta;
};

/**
 * Success Response Middleware for Florin
 * (looks like an error middleware because it is);
 */
const Response = function (response, req, res, next) {
  if (response instanceof SuccessResponse === false
    && response instanceof AuthResponse === false) { // for some reason !response doesn't work
    console.log(response);
    next(response);
  } else if (response instanceof AuthResponse) {
    console.log(response);
    res.status(response.status).json(response);
  } else {
    console.log(response);
    response.status = res.status; // eslint-disable-line no-param-reassign
    res.status(res.statusCode || 200).json(response);
  }
};

module.exports = {
  AuthResponse,
  ErrorResponse,
  SuccessResponse,
  Response,
};
