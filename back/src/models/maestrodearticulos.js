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
        foreignKey: 'entidadId',
        onUpdate: 'CASCADE',
      });

      MaestroDeArticulos.belongsTo(models.UnidadesDeMedida, {
        foreignKey: 'uni_medida',
        onUpdate: 'CASCADE',
      });
      
    }


  }
  MaestroDeArticulos.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    costo_unit: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    tipoArticulo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MaestroDeArticulos',
  });
  return MaestroDeArticulos;
};