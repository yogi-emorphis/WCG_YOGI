/** Function to help flush the database. */

const db = require('../app/models/index').db();

const flushDatabase = function () {
  return Promise.all(db.modelNames.map(modelName =>
    db[modelName].destroy({ where: {}, truncate: true })))
    .then(() => db.sequelize.close())
    .catch(error => error);
};

const syncDatabase = function () {
 return db.sequelize.sync({ force: false });
};

module.exports = {
  flushDatabase,
  syncDatabase,
};
