'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InsumoEnProceso extends Model {
    static associate(models) {
      InsumoEnProceso.belongsToMany(models.CompraPreparacion, {
        through: 'CompraInsumoEnProceso', 
        foreignKey: 'InsumoEnProcesoId', 
        otherKey: 'CompraPreparacionId' 
      }),
      
      InsumoEnProceso.belongsToMany(models.CompraFinalizacion, {
        through: 'InsumoFinalizacion', 
        foreignKey: 'InsumoEnProcesoId', 
        otherKey: 'CompraFinalizacionId' 
      })
        
      
    }
  }

  InsumoEnProceso.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InsumoEnProceso',
  });

  return InsumoEnProceso;
};
