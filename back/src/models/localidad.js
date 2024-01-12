'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Localidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Localidad.belongsTo(models.Provincia);
      Localidad.hasMany(models.Bancos);
    }
  }
  Localidad.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Localidad',
  });
  return Localidad;
};