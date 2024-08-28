'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reclamos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reclamos.belongsTo(models.Tipo_Reclamo, {
        foreignKey: 'id_tipo_reclamo',
        onUpdate: 'CASCADE',
      });

      Reclamos.belongsTo(models.Personas, {
        foreignKey: 'id_persona',
        onUpdate: 'CASCADE',
      });

      Reclamos.belongsTo(models.Pedidos, {
        foreignKey: 'id_pedido'
      })
    }
  }
  Reclamos.init({
    detalles_reclamo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reclamos',
  });
  return Reclamos;
};