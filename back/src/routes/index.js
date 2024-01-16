// Index of routes
const personasRouter = require('./personas');
const maestroArticulosRouter = require('./maestro-articulos');
const pedidosRouter = require('./pedidos');
const cantidadesRouter = require('./cantidades');
const productosRouter = require('./productos');
const documentosRouter = require('./documentos');
const generarPdfRouter = require('./generarPdf');
const depositosRouter = require('./depositos');
const paisesRouter = require('./paises');
const provinciasRouter = require('./provincias');
const localidadesRouter = require('./localidades');
const bancosRouter = require('./bancos');
const tipo_personaRouter = require('./Tipo_Persona');
const cond_ivaRouter = require('./Cond_Iva');


module.exports = {
    personasRouter,
    pedidosRouter,
    cantidadesRouter,
    productosRouter,
    documentosRouter,
    generarPdfRouter,
    maestroArticulosRouter,
    depositosRouter,
    paisesRouter,
    provinciasRouter,
    localidadesRouter,
    bancosRouter,
    tipo_personaRouter,
    cond_ivaRouter
 };