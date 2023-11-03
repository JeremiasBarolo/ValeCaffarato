'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InsumoFinalizacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CompraFinalizacionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CompraFinalizacions', // Nombre de la tabla relacionada
          key: 'id', // Clave principal de la tabla relacionada
        },
        allowNull: false,
      },
      InsumoEnProcesoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'InsumoEnProcesos', // Nombre de la tabla relacionada
          key: 'id', // Clave principal de la tabla relacionada
        },
        allowNull: false,
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
    await queryInterface.dropTable('InsumoFinalizacion');
  },
};
