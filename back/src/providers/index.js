const personasProvider  = require("./personas");
const productentityProvider = require("./productentity");
const insumosentityProvider = require("./insumosentity");
const insumoProvider = require("./insumo");
const pedidosProvider = require("./pedidos");
const productosProvider = require("./producto");
const documentoProvider = require("./documentos");

module.exports = { 
    personasProvider, 
    productentityProvider, 
    insumosentityProvider,
    insumoProvider,
    pedidosProvider,
    productosProvider,
    documentoProvider
};