/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// Index of routes
const personasRouter = require('./personas');
const productentityRouter = require('./productentity');
const insumosentityRouter = require('./insumosentity');
const insumosRouter = require('./insumos');
const pedidosRouter = require('./pedidos');
const cantidadesRouter = require('./cantidades');
const productosRouter = require('./productos');


module.exports = {
    personasRouter,
    productentityRouter,
    insumosentityRouter,
    insumosRouter,
    pedidosRouter,
    cantidadesRouter,
    productosRouter
 };