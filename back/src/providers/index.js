const empleadosProvider = require("./empleados");
const clientesProvider = require("./clientes");
const proveedoresProvider = require("./proveedores");
const productentityProvider = require("./productentity");
const insumosentityProvider = require("./insumosentity");
const insumoProvider = require("./insumo");
const pedidosProvider = require("./pedidos");

module.exports = { empleadosProvider, 
    clientesProvider, 
    proveedoresProvider, 
    productentityProvider, 
    insumosentityProvider,
    insumoProvider,
    pedidosProvider
};