'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CompraPreparacion extends Model {
    static associate(models) {
      CompraPreparacion.belongsToMany(models.InsumoEnProceso, {
        through: 'CompraInsumoEnProceso', 
        foreignKey: 'CompraPreparacionId', 
        otherKey: 'InsumoEnProcesoId' 
      });
    }
  }

  CompraPreparacion.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompraPreparacion',
  });

  return CompraPreparacion;
};
