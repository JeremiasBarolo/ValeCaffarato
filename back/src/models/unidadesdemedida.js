'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnidadesDeMedida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UnidadesDeMedida.hasMany(models.MaestroDeArticulos, {
        foreignKey: 'uni_medida'
      })

      UnidadesDeMedida.hasMany(models.ProductosEnStock, {
        foreignKey: 'uni_medida'
      })
    }
  }
  UnidadesDeMedida.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UnidadesDeMedida',
  });
  return UnidadesDeMedida;
};