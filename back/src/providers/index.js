const personasProvider  = require("./personas");
const insumoProvider = require("./insumo");
const pedidosProvider = require("./pedidos");
const productosProvider = require("./producto");
const documentoProvider = require("./documentos");
const maestroArticulosProvider = require("./maestro-articulos");

module.exports = { 
    personasProvider, 
    maestroArticulosProvider,
    insumoProvider,
    pedidosProvider,
    productosProvider,
    documentoProvider
};