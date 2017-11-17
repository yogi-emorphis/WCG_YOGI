'use strict';

module.exports = (sequelize, DataTypes) => {
  const ApiCall = sequelize.define('ApiCall', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    status: DataTypes.STRING,
  });

  ApiCall.associate = models => {
    ApiCall.belongsTo(models.Supplier);
  };

  return ApiCall;
};
