'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      orderDate: {
        type: Sequelize.DATE,
      },
      serviceFee: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.STRING,
      },
      invoiceNumber: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Orders'),
};
