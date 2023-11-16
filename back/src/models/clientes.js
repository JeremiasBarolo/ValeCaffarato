const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Clientes.belongsTo(models.Personas, {
        foreignKey: 'personaId', 
        as: 'persona',
      })
    }
  }
  
  Clientes.init({
    industry: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};
