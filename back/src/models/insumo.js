'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Insumo.belongsToMany(models.MaestroDeArticulos, {
        through: 'ProductQuantities',
        foreignKey: 'insumoId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

      })
      Insumo.belongsTo(models.Depositos, {
        foreignKey: 'depositoId',
        as: 'deposito', // Usa el mismo alias que en la definición de la asociación
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });   
    }
  }
  Insumo.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    quantity_reserved: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    antiguo_id: DataTypes.INTEGER,
    unidad_medida: DataTypes.STRING,
    depositoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Insumos',
  });
  return Insumo;
};