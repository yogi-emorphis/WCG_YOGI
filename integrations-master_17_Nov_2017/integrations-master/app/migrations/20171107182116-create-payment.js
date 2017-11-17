'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      amountOpen: {
        type: Sequelize.DECIMAL,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.STRING,
      },
      type: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Payments'),
};
