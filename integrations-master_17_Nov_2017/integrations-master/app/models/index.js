'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const envfile = require('node-env-file');

if (!process.env.NODE_ENV || !process.env.DATABASE_URL) {
  envfile('./.env', { raise: true }); // Load env vars from file (for dev)
}

const env = process.env.NODE_ENV || 'local';
const config = require(__dirname + '/../../init/db/config.json')[env];

const db = function () {
  const database = {};
  const modelNames = [];
  const sequelize = new Sequelize(process.env[config.use_env_variable], config);

  fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file));
      database[model.name] = model;
      modelNames.push(model.name);
    });

  Object.keys(database).forEach(modelName => {
    if (database[modelName].associate) {
      database[modelName].associate(database);
    }
  });

  database.modelNames = modelNames;
  database.sequelize = sequelize;
  database.Sequelize = Sequelize;

  return database;
};

const init = function (app) {
  const currentApp = app;
  const database = db();
  currentApp.db = database;

  return currentApp;
};

module.exports = {
  db,
  init,
};
