'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documentos extends Model {
    static associate(models) {
      Documentos.belongsTo(models.Pedidos, { foreignKey: 'pedidoId' });

      Documentos.belongsToMany(models.Personas, {
        through: 'PersonaDocumentos', 
        foreignKey: 'documentoId', 
        otherKey: 'personaId' 
      });
    
    
    }
  }
  Documentos.init({
    iva: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    totalIva: DataTypes.INTEGER,
    condicionIva: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Documentos',
  });
  return Documentos;
};