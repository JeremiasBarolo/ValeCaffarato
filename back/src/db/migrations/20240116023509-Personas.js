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
      CondIvaId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Cond_Ivas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      TipoPersonaId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Tipo_Personas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      documentoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Documentos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
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