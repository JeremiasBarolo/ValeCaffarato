const personasService = require('./personas');
const insumoService  = require('./insumo');
const pedidosService = require('./pedidos');
const productosService = require('./producto');
const documentoService = require('./documentos');
const maestroArticulosService = require('./maestro-articulos');
const depositosService = require('./depositos');

module.exports = {
    personasService,
    insumoService,
    pedidosService,
    productosService,
    documentoService,
    maestroArticulosService,
    depositosService
};