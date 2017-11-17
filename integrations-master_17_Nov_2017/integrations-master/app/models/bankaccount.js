'use strict';

module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define('BankAccount', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    status: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    swift: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    accountName: DataTypes.STRING,
  });

  BankAccount.associate = models => {
    BankAccount.belongsTo(models.Company);
  };

  return BankAccount;
};
