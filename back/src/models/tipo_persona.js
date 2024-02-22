'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tipo_Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tipo_Persona.hasMany(models.Personas, {
        foreignKey: 'TipoPersonaId'
      })
    }
  }
  Tipo_Persona.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tipo_Persona',
  });
  return Tipo_Persona;
};