/* eslint-disable eol-last */
/* eslint-disable import/no-unresolved */
// Index of routes
const empleadosController = require('./empleados');
const clientesController = require('./clientes');
const proveedoresController = require('./proveedores');
const productentityController = require('./productentity');
const insumosentityController = require('./insumosentity');
const insumoController = require('./insumo');
const compraPresupuestoController = require('./compraPresupuesto');
const compraPreparacionController = require('./compraPreparacion');

module.exports = { 
    empleadosController, 
    clientesController, 
    proveedoresController,
    productentityController, 
    insumosentityController, 
    insumoController,
    compraPresupuestoController,
    compraPreparacionController

};