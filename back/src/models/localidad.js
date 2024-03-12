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
      Localidad.belongsTo(models.Provincia,
        {
          foreignKey: 'provinciaId',
        });
      // Localidad.hasMany(models.Bancos,
      //   {
      //     foreignKey: 'localidadId',
      //   });
      Localidad.hasMany(models.Personas);
    }
  }
  Localidad.init({
    name: DataTypes.STRING,
    codigo_postal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Localidad',
  });
  return Localidad;
};