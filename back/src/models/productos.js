'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   Productos.belongsTo(models.Depositos, {
    //     foreignKey: 'depositoId',
    //     as: 'deposito',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //   });
    }
  }
  Productos.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    costo_unit: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    antiguo_id: DataTypes.INTEGER,
    unidad_medida: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};