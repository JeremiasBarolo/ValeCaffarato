'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductQuantities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductQuantities.init({
    quantity_necessary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductQuantities',
  });
  return ProductQuantities;
};