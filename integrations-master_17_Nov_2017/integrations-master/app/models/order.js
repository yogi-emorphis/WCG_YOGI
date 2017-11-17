'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    orderDate: DataTypes.DATE,
    serviceFee: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    invoiceNumber: DataTypes.STRING,
  });

  Order.associate = models => {
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderItem);
    Order.hasMany(models.Payment);
  };

  return Order;
};
