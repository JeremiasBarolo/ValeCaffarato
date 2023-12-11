'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PedidosProductos', {
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
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'MaestroDeArticulos',
          key: 'id',
          onDelete: 'CASCADE'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity_requested: {
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
