const {
  Model,
// eslint-disable-next-line import/newline-after-import
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empleados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Empleados.belongsTo(models.Personas, {
        foreignKey: 'personaId', 
        as: 'persona',
      })
    }

    
  }
  Empleados.init({
    cargo: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Empleados',
  });
  return Empleados;
};
