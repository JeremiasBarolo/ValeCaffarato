'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductosEnStock', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costo_unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity_reserved: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      type:{
        type: Sequelize.STRING,
        allowNull: false
      },
      profit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      antiguo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductosEnStock');
  }
};