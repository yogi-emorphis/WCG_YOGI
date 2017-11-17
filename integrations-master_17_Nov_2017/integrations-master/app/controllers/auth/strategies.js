'use strict';

const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const BearerStrategy = require('passport-http-bearer').Strategy;
const crypto = require('crypto');
const { AuthResponse } = require('../../helpers/responses');
const { User } = require('../../models/index').db();
const bcrypt = require('bcrypt');
const roleMiddleware = require('../auth/roleMiddleware');

const strategies = function () {
  passport.use('basic', new BasicStrategy((email, password, done) => {
    if (!email || !password) {
      return done(new AuthResponse('Incorrect details.', 401, 1), false);
    }

    return User.find({ where: { email } })
      .then(result => {
        if (!result) {
          throw new AuthResponse('Incorrect details.', 401, 1);
        }

        if (result && result.password) {
          return bcrypt.compare(password, result.password);
        }

        throw new AuthResponse('Incorrect details.', 401, 1);
      })
      .then(res => {
        if (!res) {
          return done(new AuthResponse('Incorrect details.', 401, 1), false);
        }
        return done(null, {});
      })
      .catch(error => done(error, false));
  }));

  passport.use('token', new BearerStrategy((accessToken, done) => {
    const hash = crypto.createHash('sha1').update(accessToken).digest('hex');
    User.find({ where: { accessToken: hash } })
      .then(result => {
        if (!result) {
          throw new AuthResponse('Incorrect details.', 401, 1);
        }

        const info = { scope: result.role, id: result.id };
        return done(null, result, info);
      })
      .catch(error => done(error, false));
  }));

  return {
    authBasic: passport.authenticate('basic', { session: false }),
    authToken: passport.authenticate('token', { session: false }),
    acl: roleMiddleware,
  };
};

module.exports = strategies;
