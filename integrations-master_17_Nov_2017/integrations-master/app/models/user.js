'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    verifyStatus: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    skype: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    role: DataTypes.STRING,
  });

  User.associate = models => {
    User.hasOne(models.Company);
  };

  return User;
};
