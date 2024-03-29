module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ProductQuantities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entidadId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'MaestroDeArticulos',
          key: 'id',
        },
        
      },
      productoId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'ProductosEnStock',
          key: 'id',
        },
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
    await queryInterface.dropTable('ProductQuantities');
  }
};
