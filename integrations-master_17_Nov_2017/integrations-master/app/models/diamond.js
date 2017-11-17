'use strict';

module.exports = (sequelize, DataTypes) => {
  const Diamond = sequelize.define('Diamond', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    supplierStockId: DataTypes.STRING,
    shape: DataTypes.STRING,
    carats: DataTypes.DECIMAL,
    clarity: DataTypes.STRING,
    cut: DataTypes.STRING,
    polish: DataTypes.STRING,
    symmetry: DataTypes.STRING,
    flouresenceIntensity: DataTypes.STRING,
    flouresenceColor: DataTypes.STRING,
    length: DataTypes.DECIMAL,
    width: DataTypes.DECIMAL,
    depth: DataTypes.DECIMAL,
    depthPercentage: DataTypes.DECIMAL,
    color: DataTypes.STRING,
    colorShade: DataTypes.STRING,
    rapaportRate: DataTypes.DECIMAL,
    rapaportValue: DataTypes.DECIMAL,
    rapaportDiscount: DataTypes.DECIMAL,
    rateWithDiscount: DataTypes.DECIMAL,
    valueWithDiscount: DataTypes.DECIMAL,
    lab: DataTypes.STRING,
    certificateNumber: DataTypes.STRING,
    eyeClean: DataTypes.STRING,
    girdle: DataTypes.STRING,
    girdlePercent: DataTypes.DECIMAL,
    girdleCondition: DataTypes.STRING,
    culetSize: DataTypes.STRING,
    crownHeight: DataTypes.DECIMAL,
    crownAngle: DataTypes.DECIMAL,
    crownNatts: DataTypes.STRING,
    pavilionHeight: DataTypes.DECIMAL,
    pavilionDepth: DataTypes.DECIMAL,
    pavilionAngle: DataTypes.DECIMAL,
    laserInscription: DataTypes.STRING,
    comments: DataTypes.STRING,
    starLength: DataTypes.INTEGER,
    location: DataTypes.STRING,
    keyToSymbols: DataTypes.STRING,
    blackInCentre: DataTypes.STRING,
    blackInSide: DataTypes.STRING,
    whiteInCentre: DataTypes.STRING,
    whiteInSide: DataTypes.STRING,
    table: DataTypes.DECIMAL,
    tableInclusion: DataTypes.STRING,
    tableNatts: DataTypes.STRING,
    milky: DataTypes.STRING,
    brown: DataTypes.STRING,
    image: DataTypes.STRING,
    segoma: DataTypes.STRING,
    v360: DataTypes.STRING,
    certificateLink: DataTypes.STRING,
    lowerGirdle: DataTypes.STRING,
    inclusionType: DataTypes.STRING,
    pairs: DataTypes.STRING,
    pairsRef: DataTypes.STRING,
    fancyIntensity: DataTypes.STRING,
    fancyColor: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  Diamond.associate = models => {
    Diamond.belongsToMany(models.Supplier, { through: 'SupplierDiamond' });
  };

  return Diamond;
};
