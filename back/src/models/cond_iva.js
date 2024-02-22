'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cond_Iva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cond_Iva.hasMany(models.Personas, {
        foreignKey: 'CondIvaId'
      })
    }
  }
  Cond_Iva.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cond_Iva',
  });
  return Cond_Iva;
};