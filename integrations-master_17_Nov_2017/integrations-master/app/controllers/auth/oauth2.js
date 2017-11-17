'use strict';

const oauth2orize = require('oauth2orize');
const passport = require('passport');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { AuthResponse } = require('../../helpers/responses');
const { User } = require('../../models/index').db();

// create OAuth 2.0 server
const authServer = oauth2orize.createServer();

const getRndNum = function () {
  const res = (`0.${parseInt(crypto.randomBytes(8).toString('hex'), 16)}`)
    .replace(/(^0)|(0$)/g, '');
  return parseFloat(res);
};

const getRandomInt = function (min, max) {
  return Math.floor(getRndNum() * (max - min + 1)) + min;
};

const uid = function (len) {
  const buf = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charlen = chars.length;

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

const oauth = function () {
  let u;
  let t;
  authServer.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
    User.find({ where: { email: username } })
      .then(result => {
        if (!result) {
          throw new AuthResponse('Incorrect details.', 401, 1);
        }

        if (result.password) {
          u = result;
          return bcrypt.compare(password, result.password);
        }

        throw new AuthResponse('Incorrect details.', 401, 1);
      })
      .then(res => {
        if (!res) {
          return done(new AuthResponse('Incorrect details.', 401, 1), false);
        }

        t = uid(256);
        u.accessToken = crypto.createHash('sha1').update(t).digest('hex');

        return u.save();
      })
      .then(() => done(null, t, {
        role: u.role,
      }))
      .catch(error => done(error, false));
  }));

  return [
    passport.authenticate('basic', { session: false }),
    authServer.token(),
  ];
};

module.exports = oauth;
