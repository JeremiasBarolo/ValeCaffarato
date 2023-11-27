const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductEntity.belongsToMany(models.Insumos, {
        through: 'ProductEntityQuantities',
        foreignKey: 'productEntityId',
      });

      ProductEntity.belongsToMany(models.Pedidos, {
        through: 'PedidosProductos', 
        foreignKey: 'productEntityId', 
        otherKey: 'pedidoId' 
      });
    }
  }
  ProductEntity.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    measurement_height: DataTypes.INTEGER,
    measurement_length: DataTypes.INTEGER,
    measurement_depth: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    unidad_medida: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductEntity',
  });
  return ProductEntity;

};