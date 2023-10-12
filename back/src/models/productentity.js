/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductEntity.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    measurement_height: DataTypes.INTEGER,
    measurement_length: DataTypes.INTEGER,
    measurement_depth: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductEntity',
  });
  return ProductEntity;
// eslint-disable-next-line eol-last
};