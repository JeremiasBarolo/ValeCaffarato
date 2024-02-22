'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bancos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bancos.belongsTo(models.Localidad,
        {
          foreignKey: 'localidadId',
        });
    }
  }
  Bancos.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bancos',
  });
  return Bancos;
};