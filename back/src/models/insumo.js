'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Insumo.belongsToMany(models.ProductEntity, {
        through: 'ProductEntityQuantities',
        foreignKey: 'insumoId',
      });
    }
  }
  Insumo.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    antiguo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Insumos',
  });
  return Insumo;
};