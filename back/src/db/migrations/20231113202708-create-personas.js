// En tu archivo de migración para Personas (por ejemplo, 20230101000000-create-personas.js)
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
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      dni: {
        type: Sequelize.BIGINT(20),
      },
      adress: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
      categoria: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Personas');
  },
};
