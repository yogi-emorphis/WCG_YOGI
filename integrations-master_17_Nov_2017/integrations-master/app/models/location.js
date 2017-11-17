'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    status: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  Location.associate = models => {
    Location.belongsTo(models.Company);
  };

  return Location;
};
