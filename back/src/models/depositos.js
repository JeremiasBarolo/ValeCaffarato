'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Depositos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Depositos.belongsToMany(models.Insumos, {
        through: 'RelacionesDepositos', 
        foreignKey: 'depositoId', 
        otherKey: 'insumoId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', 
      });

      Depositos.belongsToMany(models.Productos, {
        through: 'RelacionesDepositos', 
        foreignKey: 'depositoId', 
        otherKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Depositos.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Depositos',
  });
  return Depositos;
};