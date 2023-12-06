'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('MaestroDeArticulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uni_medida: {
        type: Sequelize.STRING,
        allowNull: false
      },
      costo_unit: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      profit: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      tipoArticulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Pedidos',
          key: 'id',
          onDelete: 'CASCADE'
        },
      },
      documentoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Documentos',
          key: 'id',
          onDelete: 'CASCADE'
        },
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
