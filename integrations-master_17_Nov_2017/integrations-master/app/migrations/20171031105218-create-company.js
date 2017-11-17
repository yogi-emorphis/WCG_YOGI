'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
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
      status: {
        type: Sequelize.INTEGER,
      },
      address1: {
        type: Sequelize.STRING,
      },
      address2: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      phone1: {
        type: Sequelize.STRING,
      },
      phone2: {
        type: Sequelize.STRING,
      },
      website: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Companies'),
};
