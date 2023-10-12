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
      // define association here
    }
  }
  Empleados.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    adress: DataTypes.STRING,
    adressNumber: DataTypes.INTEGER,
    dni: DataTypes.INTEGER,
    city: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    cuit: DataTypes.INTEGER,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Empleados',
  });
  return Empleados;
};
