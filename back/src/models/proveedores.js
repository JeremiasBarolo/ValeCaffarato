const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proveedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Proveedores.belongsTo(models.Personas, {
        foreignKey: 'personaId', 
        as: 'persona',
      })
    }
  }
  Proveedores.init({
    industry: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Proveedores',
  });
  return Proveedores;
};
