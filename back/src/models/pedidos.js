'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedidos.belongsToMany(models.InsumosEntities, {
        through: 'PedidosInsumos', 
        foreignKey: 'pedidoId', 
        otherKey: 'insumoEntityId',
        as: 'insumos',
        through: { model: models.PedidosInsumos, unique: false },
      });

      Pedidos.belongsToMany(models.ProductEntity, {
        through: 'PedidosProductos', 
        foreignKey: 'pedidoId', 
        otherKey: 'productEntityId',
        as: 'productos',
        through: { model: models.PedidosProductos, unique: false },
      });

      Pedidos.belongsToMany(models.Documentos, {
        through: 'PedidoDocumentos', 
        foreignKey: 'pedidoId', 
        otherKey: 'documentoId',
        as: 'Documentos',
        through: { model: models.PedidoDocumentos, unique: false },
      });
      
    }
  }
  Pedidos.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    state: DataTypes.STRING,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedidos',
  });
  return Pedidos;
};