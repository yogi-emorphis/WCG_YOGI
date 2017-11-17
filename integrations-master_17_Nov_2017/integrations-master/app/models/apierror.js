'use strict';

module.exports = (sequelize, DataTypes) => {
  const ApiError = sequelize.define('ApiError', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    json: DataTypes.JSON,
  });

  ApiError.associate = models => {
    ApiError.belongsTo(models.Supplier);
  };

  return ApiError;
};
