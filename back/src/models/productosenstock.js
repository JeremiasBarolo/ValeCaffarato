'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductosEnStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductosEnStock.belongsTo(models.Depositos, {
        foreignKey: 'depositoId',
        as: 'deposito',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      ProductosEnStock.belongsToMany(models.MaestroDeArticulos, {
        through: 'ProductQuantities',
        foreignKey: 'productoId',
      });
    }
  }
  ProductosEnStock.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    costo_unit: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    antiguo_id: DataTypes.INTEGER,
    quantity_reserved: DataTypes.INTEGER,
    unidad_medida: DataTypes.STRING,
    depositoId: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductosEnStock',
    tableName: 'ProductosEnStock',
  });
  return ProductosEnStock;
};