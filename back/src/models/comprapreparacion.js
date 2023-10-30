'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompraPreparacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompraPreparacion.belongsToMany(models.InsumosEntities, {
        through: 'PreparacionInsumos', 
        foreignKey: 'preparacionId', 
        otherKey: 'insumosEntityId' 
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