'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PedidosInsumos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pedidoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Pedidos',
          key: 'id',
          onDelete: 'SET NULL'
        }
      },
      insumoEntityId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'InsumosEntities',
          key: 'id',
          onDelete: 'SET NULL'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('Pedidos');
  }
};
