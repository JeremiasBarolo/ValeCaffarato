const empleadosProvider = require("./empleados");
const clientesProvider = require("./clientes");
const proveedoresProvider = require("./proveedores");
const productentityProvider = require("./productentity");
const insumosentityProvider = require("./insumosentity");
const insumoProvider = require("./insumo");
const compraPresupuestoProvider = require("./compraPresupuesto");
const compraPreparacionProvider = require("./compraPreparacion");
const compraFinalizacionProvider = require("./compraFinalizacion");

module.exports = { empleadosProvider, 
    clientesProvider, 
    proveedoresProvider, 
    productentityProvider, 
    insumosentityProvider,
    insumoProvider,
    compraPresupuestoProvider,
    compraPreparacionProvider,
    compraFinalizacionProvider,
};