'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PersonaDocumentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      personaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Personas',
          key: 'id',
          onDelete: 'CASCADE'
        }
      },
      documentoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Documentos',
          key: 'id',
          onDelete: 'CASCADE'
        }
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
    await queryInterface.dropTable('PersonaDocumentos');
  }
};