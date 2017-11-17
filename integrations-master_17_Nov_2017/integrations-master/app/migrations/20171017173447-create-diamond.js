'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Diamonds', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      supplierStockId: {
        type: Sequelize.STRING,
      },
      shape: {
        type: Sequelize.STRING,
      },
      carats: {
        type: Sequelize.DECIMAL,
      },
      clarity: {
        type: Sequelize.STRING,
      },
      cut: {
        type: Sequelize.STRING,
      },
      polish: {
        type: Sequelize.STRING,
      },
      symmetry: {
        type: Sequelize.STRING,
      },
      flouresenceIntensity: {
        type: Sequelize.STRING,
      },
      flouresenceColor: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.DECIMAL,
      },
      width: {
        type: Sequelize.DECIMAL,
      },
      depth: {
        type: Sequelize.DECIMAL,
      },
      depthPercentage: {
        type: Sequelize.DECIMAL,
      },
      color: {
        type: Sequelize.STRING,
      },
      colorShade: {
        type: Sequelize.STRING,
      },
      rapaportRate: {
        type: Sequelize.DECIMAL,
      },
      rapaportValue: {
        type: Sequelize.DECIMAL,
      },
      rapaportDiscount: {
        type: Sequelize.DECIMAL,
      },
      rateWithDiscount: {
        type: Sequelize.DECIMAL,
      },
      valueWithDiscount: {
        type: Sequelize.DECIMAL,
      },
      lab: {
        type: Sequelize.STRING,
      },
      certificateNumber: {
        type: Sequelize.STRING,
      },
      eyeClean: {
        type: Sequelize.STRING,
      },
      girdle: {
        type: Sequelize.STRING,
      },
      girdlePercent: {
        type: Sequelize.DECIMAL,
      },
      girdleCondition: {
        type: Sequelize.STRING,
      },
      culetSize: {
        type: Sequelize.STRING,
      },
      crownHeight: {
        type: Sequelize.DECIMAL,
      },
      crownAngle: {
        type: Sequelize.DECIMAL,
      },
      crownNatts: {
        type: Sequelize.STRING,
      },
      pavilionHeight: {
        type: Sequelize.DECIMAL,
      },
      pavilionDepth: {
        type: Sequelize.DECIMAL,
      },
      pavilionAngle: {
        type: Sequelize.DECIMAL,
      },
      laserInscription: {
        type: Sequelize.STRING,
      },
      comments: {
        type: Sequelize.STRING,
      },
      starLength: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      keyToSymbols: {
        type: Sequelize.STRING,
      },
      blackInCentre: {
        type: Sequelize.STRING,
      },
      blackInSide: {
        type: Sequelize.STRING,
      },
      whiteInCentre: {
        type: Sequelize.STRING,
      },
      whiteInSide: {
        type: Sequelize.STRING,
      },
      table: {
        type: Sequelize.DECIMAL,
      },
      tableInclusion: {
        type: Sequelize.STRING,
      },
      tableNatts: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      segoma: {
        type: Sequelize.STRING,
      },
      v360: {
        type: Sequelize.STRING,
      },
      certificateLink: {
        type: Sequelize.STRING,
      },
      lowerGirdle: {
        type: Sequelize.STRING,
      },
      inclusionType: {
        type: Sequelize.STRING,
      },
      pairs: {
        type: Sequelize.STRING,
      },
      pairsRef: {
        type: Sequelize.STRING,
      },
      fancyIntensity: {
        type: Sequelize.STRING,
      },
      milky: {
        type: Sequelize.STRING,
      },
      brown: {
        type: Sequelize.STRING,
      },
      fancyColor: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Diamonds'),
};
