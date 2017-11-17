'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HistoricPrices', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      shape: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      clarity: {
        type: Sequelize.STRING,
      },
      lowSize: {
        type: Sequelize.DECIMAL,
      },
      highSize: {
        type: Sequelize.DECIMAL,
      },
      caratPrice: {
        type: Sequelize.DECIMAL,
      },
      date: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('HistoricPrices'),
};
