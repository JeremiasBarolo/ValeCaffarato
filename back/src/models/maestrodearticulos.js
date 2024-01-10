'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaestroDeArticulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MaestroDeArticulos.belongsToMany(models.ProductosEnStock, {
        through: 'ProductQuantities',
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  MaestroDeArticulos.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    uni_medida: DataTypes.STRING,
    costo_unit: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    tipoArticulo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MaestroDeArticulos',
  });
  return MaestroDeArticulos;
};