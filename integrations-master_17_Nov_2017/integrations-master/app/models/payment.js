'use strict';

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    amountOpen: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
  });

  Payment.associate = models => {
    Payment.belongsTo(models.Order);
    Payment.belongsTo(models.User);
  };

  return Payment;
};
