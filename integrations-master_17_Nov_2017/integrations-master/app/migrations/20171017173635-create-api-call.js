'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ApiCalls', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
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
      supplierId: {
        type: Sequelize.UUID,
        references: {
          model: 'Supplier',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ApiCalls'),
};
