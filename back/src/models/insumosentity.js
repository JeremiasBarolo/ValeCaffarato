/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable eol-last */
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InsumosEntities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InsumosEntities.belongsToMany(models.CompraPresupuesto, {
        through: 'PresupuestoInsumos', 
        foreignKey: 'insumosEntityId', 
        otherKey: 'presupuestoId' 
      });
    }
  }
  InsumosEntities.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'InsumosEntities',
  });
  return InsumosEntities;
};