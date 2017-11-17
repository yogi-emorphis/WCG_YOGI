'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Suppliers', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      apiType: {
        type: Sequelize.STRING,
      },
      apiUser: {
        type: Sequelize.STRING,
      },
      apiPassword: {
        type: Sequelize.STRING,
      },
      apiUrl: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Suppliers'),
};
