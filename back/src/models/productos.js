'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Productos.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    measurement_height: DataTypes.INTEGER,
    measurement_length: DataTypes.INTEGER,
    measurement_depth: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    antiguo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};