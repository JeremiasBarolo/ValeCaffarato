'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidosInsumos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PedidosInsumos.init({
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PedidosInsumos',
  });
  return PedidosInsumos;
};