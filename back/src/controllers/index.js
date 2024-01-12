// Index of routes
const personasController = require('./personas');
const pedidosController = require('./pedidos');
const cantidadesController = require('./cantidades');
const productosController = require('./producto');
const documentoController = require('./documentos');
const maestroArticulosController = require('./maestro-articulos');
const depositosController = require('./depositos');
const paisesController = require('./paises');
const provinciasController = require('./provincias');
const localidadesController = require('./localidades');
const bancosController = require('./bancos');

module.exports = { 
    personasController,
    pedidosController,
    cantidadesController,
    productosController,
    documentoController,
    maestroArticulosController,
    depositosController,
    paisesController,
    provinciasController,
    localidadesController,
    bancosController,
};