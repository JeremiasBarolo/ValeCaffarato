'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      lastname: {
        type: Sequelize.STRING(100),
      },
      dni: {
        type: Sequelize.BIGINT(100),
      },
      adress: {
        type: Sequelize.STRING(100),
      },
      phone: {
        type: Sequelize.BIGINT(100),
      },
      adress_number: {
        type: Sequelize.BIGINT(100),
      },
      cuil: {
        type: Sequelize.BIGINT(100),
      },
      email: {
        type: Sequelize.STRING(100),
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Personas');
  },
};