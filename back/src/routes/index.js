/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// Index of routes
const personasRouter = require('./personas');
const maestroArticulosRouter = require('./maestro-articulos');
const pedidosRouter = require('./pedidos');
const cantidadesRouter = require('./cantidades');
const productosRouter = require('./productos');
const documentosRouter = require('./documentos');
const generarPdfRouter = require('./generarPdf');
const depositosRouter = require('./depositos');


module.exports = {
    personasRouter,
    pedidosRouter,
    cantidadesRouter,
    productosRouter,
    documentosRouter,
    generarPdfRouter,
    maestroArticulosRouter,
    depositosRouter
 };