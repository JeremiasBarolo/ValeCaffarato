'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Monedas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Monedas.hasMany(models.Pedidos)
    }
  }
  Monedas.init({
    description: DataTypes.STRING,
    simbolo:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Monedas',
  });
  return Monedas;
};