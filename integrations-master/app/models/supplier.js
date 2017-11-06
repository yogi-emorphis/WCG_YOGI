'use strict';

module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    apiType: DataTypes.STRING,
    apiUser: DataTypes.STRING,
    apiPassword: DataTypes.STRING,
    apiUrl: DataTypes.STRING,
  });

  Supplier.associate = models => {
    Supplier.belongsToMany(models.Diamond, { through: 'SupplierDiamond' });
    Supplier.belongsToMany(models.HistoricDiamond, { through: 'SupplierHistoricDiamond' });
    Supplier.hasMany(models.ApiCall);
  };

  return Supplier;
};
