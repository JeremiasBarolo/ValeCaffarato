'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Personas.hasMany(models.Empleados, {
        foreignKey: 'personaId', 
        as: 'empleado',
      })
      Personas.hasMany(models.Proveedores, {
        foreignKey: 'personaId', 
        as: 'proveedor',
      })
      Personas.hasMany(models.Clientes, {
        foreignKey: 'personaId', 
        as: 'cliente',
      })
      Personas.belongsToMany(models.Documentos, {
        through: 'PersonaDocumentos', 
        foreignKey: 'personaId', 
        otherKey: 'documentoId',
        as: 'DocumentoCliente',
        through: { model: models.PersonaDocumentos, unique: false },
      });
    }
  }
  Personas.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    adress_number: DataTypes.INTEGER,
    cuil: DataTypes.INTEGER,
    email: DataTypes.STRING,
    categoria: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Personas',
  });
  return Personas;
};