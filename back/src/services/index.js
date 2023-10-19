const empleadosService = require('./empleados');
const clientesService = require('./clientes');
const proveedoresService = require('./proveedores');
const productentityService = require('./productentity');
const insumosentityService  = require('./insumosentity');
const insumoService  = require('./insumo');
const compraPresupuestoService = require('./compraPresupuesto');
const compraPreparacionService = require('./compraPreparacion');
const compraFinalizacionService = require('./compraFinalizacion');

module.exports = {
    empleadosService,
    clientesService,
    proveedoresService,
    productentityService,
    insumosentityService,
    insumoService,
    compraPresupuestoService,
    compraPreparacionService,
    compraFinalizacionService
};