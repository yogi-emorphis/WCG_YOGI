'use strict';

const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./app/models/index.js');
const cors = require('cors');
const { Response, ErrorResponse } = require('./app/helpers/responses');

const app = db.init(express());
app.use(logger('dev'));

app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(cors({ origin: 'https://worlddiamondcentre.co' }));

/**
 * #####################################
 * ROUTES
 * #####################################
 */
const authRoutes = require('./app/routes/auth')();
const supplierRoutes = require('./app/routes/supplier')();
const orderRoutes = require('./app/routes/order')();

const thSetup = require('./thSetup');

thSetup.run();

app.use('/auth', authRoutes);
app.use('/supplier', supplierRoutes);
app.use('/order', orderRoutes);

// pretty json responses
app.set('json spaces', 2);

app.get('/', (req, res) => res.send('WDC Integrations.'));

// success & error middleware
app.use(Response);
app.use(ErrorResponse);

app.set('view engine', 'html');

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started from the bottom now we're here on port ${(process.env.PORT || 3000)}`);
});

// assign db to server
server.db = app.db;

// provide function to shutdown database and express after running tests
server.shutdown = function (done) {
  app.db.sequelize.connectionManager.close().then(() => {
    console.log('Database shut down.');
    server.close();
    done();
  });
};

module.exports = server;
