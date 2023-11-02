'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraFinalizacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompraFinalizacion.belongsToMany(models.InsumoEnProceso, {
        through: 'InsumoFinalizacion', 
        foreignKey: 'CompraFinalizacionId', 
        otherKey: 'InsumoEnProcesoId' 
      });
    }
  }
  CompraFinalizacion.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompraFinalizacion',
  });
  return CompraFinalizacion;
};