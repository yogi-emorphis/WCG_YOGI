'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    confirmationStatus: DataTypes.STRING,
    askingPercentage: DataTypes.DECIMAL,
    askingPrice: DataTypes.DECIMAL,
    buyingPrice: DataTypes.DECIMAL,
    customerDiscount: DataTypes.DECIMAL,
    customerDiscountPercentage: DataTypes.DECIMAL,
    wdcDiscount: DataTypes.DECIMAL,
    wdcDiscountPercentage: DataTypes.DECIMAL,
    localInsuranceCost: DataTypes.DECIMAL,
    landingFee: DataTypes.DECIMAL,
    shippingCost: DataTypes.DECIMAL,
    localShippingCost: DataTypes.DECIMAL,
    GpbConversionRate: DataTypes.DECIMAL,
    GpbPrice: DataTypes.DECIMAL,
    GpbVAT: DataTypes.DECIMAL,
    GpbTotal: DataTypes.DECIMAL,
    endCustomerName: DataTypes.STRING,
    customerOrderNumber: DataTypes.STRING,
    deliveryDeadline: DataTypes.DATE,
    deliveryDate: DataTypes.DATE,
    deliveryStatus: DataTypes.STRING,
    collectedDate: DataTypes.DATE,
    transitDate: DataTypes.DATE,
  });

  OrderItem.associate = models => {
    OrderItem.hasOne(models.Diamond);
    OrderItem.hasOne(models.Location);
  };

  return OrderItem;
};
