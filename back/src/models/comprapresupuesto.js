'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraPresupuesto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompraPresupuesto.belongsToMany(models.InsumosEntities, {
        through: 'PresupuestoInsumos', 
        foreignKey: 'presupuestoId', 
        otherKey: 'insumosEntityId' 
      });
    }
  }
  CompraPresupuesto.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CompraPresupuesto',
  });
  return CompraPresupuesto;
};