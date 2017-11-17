'use strict';

module.exports = (sequelize, DataTypes) => {
  const HistoricPrice = sequelize.define('HistoricPrice', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    shape: DataTypes.STRING,
    color: DataTypes.STRING,
    clarity: DataTypes.STRING,
    lowSize: DataTypes.DECIMAL,
    highSize: DataTypes.DECIMAL,
    caratPrice: DataTypes.DECIMAL,
    date: DataTypes.STRING,
  });

  return HistoricPrice;
};
