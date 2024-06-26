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
      Personas.belongsToMany(models.Documentos, {
        through: 'PersonaDocumentos', 
        foreignKey: 'personaId', 
        otherKey: 'documentoId',
        as: 'DocumentoCliente',
        through: { model: models.PersonaDocumentos, unique: false },
      });

      Personas.belongsTo(models.Cond_Iva, {
        foreignKey: 'CondIvaId',
        as: 'Condicion_Iva'
      });
    
      Personas.belongsTo(models.Tipo_Persona, {
        foreignKey: 'TipoPersonaId',
        as: 'Tipo_Persona'
      });

      Personas.belongsTo(models.Localidad, {
        foreignKey: 'localidadId',
        as: 'Localidad'
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
  }, {
    sequelize,
    modelName: 'Personas',
  });
  return Personas;
};