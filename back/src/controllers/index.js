// Index of routes
const personasController = require('./personas');
const pedidosController = require('./pedidos');
const cantidadesController = require('./cantidades');
const productosController = require('./producto');
const documentoController = require('./documentos');
const maestroArticulosController = require('./maestro-articulos');
const depositosController = require('./depositos');

module.exports = { 
    personasController,
    pedidosController,
    cantidadesController,
    productosController,
    documentoController,
    maestroArticulosController,
    depositosController
};