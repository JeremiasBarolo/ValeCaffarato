'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CompraInsumoEnProceso', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CompraPreparacionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CompraPreparacions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      InsumoEnProcesoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'InsumoEnProcesos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

 

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CompraInsumoEnProceso');
  }
};
