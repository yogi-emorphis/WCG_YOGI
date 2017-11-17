'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderItems', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      confirmationStatus: {
        type: Sequelize.STRING,
      },
      askingPercentage: {
        type: Sequelize.DECIMAL,
      },
      askingPrice: {
        type: Sequelize.DECIMAL,
      },
      buyingPrice: {
        type: Sequelize.DECIMAL,
      },
      customerDiscount: {
        type: Sequelize.DECIMAL,
      },
      customerDiscountPercentage: {
        type: Sequelize.DECIMAL,
      },
      wdcDiscount: {
        type: Sequelize.DECIMAL,
      },
      wdcDiscountPercentage: {
        type: Sequelize.DECIMAL,
      },
      localInsuranceCost: {
        type: Sequelize.DECIMAL,
      },
      landingFee: {
        type: Sequelize.DECIMAL,
      },
      shippingCost: {
        type: Sequelize.DECIMAL,
      },
      localShippingCost: {
        type: Sequelize.DECIMAL,
      },
      GpbConversionRate: {
        type: Sequelize.DECIMAL,
      },
      GpbPrice: {
        type: Sequelize.DECIMAL,
      },
      GpbVAT: {
        type: Sequelize.DECIMAL,
      },
      GpbTotal: {
        type: Sequelize.DECIMAL,
      },
      endCustomerName: {
        type: Sequelize.STRING,
      },
      customerOrderNumber: {
        type: Sequelize.STRING,
      },
      deliveryDeadline: {
        type: Sequelize.DATE,
      },
      deliveryDate: {
        type: Sequelize.DATE,
      },
      deliveryStatus: {
        type: Sequelize.STRING,
      },
      collectedDate: {
        type: Sequelize.DATE,
      },
      transitDate: {
        type: Sequelize.DATE,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderItems'),
};
