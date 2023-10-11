/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable eol-last */
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InsumosEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InsumosEntity.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'InsumosEntity',
  });
  return InsumosEntity;
};