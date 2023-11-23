'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductEntityQuantities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      insumoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Insumos',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      productEntityId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'ProductEntities',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      quantity_necessary: {
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
    await queryInterface.dropTable('ProductEntityQuantities');
  }
};
