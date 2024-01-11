const personasService = require('./personas');
const pedidosService = require('./pedidos');
const productosService = require('./producto');
const documentoService = require('./documentos');
const maestroArticulosService = require('./maestro-articulos');
const depositosService = require('./depositos');

module.exports = {
    personasService,
    pedidosService,
    productosService,
    documentoService,
    maestroArticulosService,
    depositosService
};