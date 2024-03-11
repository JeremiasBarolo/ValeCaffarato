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
        type: Sequelize.STRING(30),
      },
      lastname: {
        type: Sequelize.STRING(30),
      },
      dni: {
        type: Sequelize.BIGINT(20),
      },
      adress: {
        type: Sequelize.STRING(30),
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      adress_number: {
        type: Sequelize.INTEGER,
      },
      cuil: {
        type: Sequelize.BIGINT(20),
      },
      email: {
        type: Sequelize.STRING(30),
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