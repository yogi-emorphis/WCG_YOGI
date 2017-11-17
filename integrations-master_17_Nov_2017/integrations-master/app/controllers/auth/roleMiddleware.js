'use strict';

const _ = require('underscore');

const checkRole = function (req, res, next, roles) {
  if (_.contains(roles, req.authInfo.scope)) {
    next();
  } else {
    res.sendStatus(400);
  }
};

module.exports = checkRole;
