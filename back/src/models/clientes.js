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
      // define association here
    }
  }
  Clientes.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    industry: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    city: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    cuit: DataTypes.INTEGER,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};
