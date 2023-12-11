/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// Index of routes
const personasController = require('./personas');
const insumoController = require('./insumo');
const pedidosController = require('./pedidos');
const cantidadesController = require('./cantidades');
const productosController = require('./producto');
const documentoController = require('./documentos');
const maestroArticulosController = require('./maestro-articulos');
const depositosController = require('./depositos');

module.exports = { 
    personasController,
    insumoController,
    pedidosController,
    cantidadesController,
    productosController,
    documentoController,
    maestroArticulosController,
    depositosController
};