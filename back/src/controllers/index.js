/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// Index of routes
const personasController = require('./personas');
const productentityController = require('./productentity');
const insumosentityController = require('./insumosentity');
const insumoController = require('./insumo');
const pedidosController = require('./pedidos');
const cantidadesController = require('./cantidades');
const productosController = require('./producto');
const documentoController = require('./documentos');

module.exports = { 
    personasController,
    productentityController, 
    insumosentityController, 
    insumoController,
    pedidosController,
    cantidadesController,
    productosController,
    documentoController
};