/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// Index of routes
const empleadosRouter = require('./empleados');
const clientesRouter = require('./clientes');
const proveedoresRouter = require('./proveedores');
const productentityRouter = require('./productentity');
const insumosentityRouter = require('./insumosentity');
const insumosRouter = require('./insumos');


module.exports = { empleadosRouter , clientesRouter, proveedoresRouter,productentityRouter, insumosentityRouter, insumosRouter };