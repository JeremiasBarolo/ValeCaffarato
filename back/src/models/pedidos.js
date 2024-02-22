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

      // encargado de las cantidades de los insumos y productos quantitys
      Pedidos.belongsToMany(models.MaestroDeArticulos, {
        through: 'PedidosProductos', 
        foreignKey: 'pedidoId', 
        otherKey: 'productId',
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

      Pedidos.belongsTo(models.Monedas,{
        through: "monedaId", 
        as: "Moneda"
      })
      
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