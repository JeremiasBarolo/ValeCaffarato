const empleadosService = require('./empleados');
const clientesService = require('./clientes');
const proveedoresService = require('./proveedores');
const productentityService = require('./productentity');
const insumosentityService  = require('./insumosentity');
const insumoService  = require('./insumo');
const pedidosService = require('./pedidos');

module.exports = {
    empleadosService,
    clientesService,
    proveedoresService,
    productentityService,
    insumosentityService,
    insumoService,
    pedidosService
};