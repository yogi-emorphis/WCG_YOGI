'use strict';

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    website: DataTypes.STRING,
  });

  Company.associate = models => {
    Company.belongsTo(models.User);
    Company.hasMany(models.Location);
  };

  return Company;
};
