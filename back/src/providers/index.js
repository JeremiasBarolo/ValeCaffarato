const personasProvider  = require("./personas");
const insumoProvider = require("./insumo");
const pedidosVentaProvider = require("./pedidos-venta");
const pedidosCompraProvider = require("./pedidos-compra");
const productosProvider = require("./producto");
const documentoProvider = require("./documentos");
const maestroArticulosProvider = require("./maestro-articulos");
const depositosProvider = require("./depositos");
const paisesProvider = require('./paises');
const provinciasProvider = require('./provincias');
const localidadesProvider = require('./localidades');
const bancosProvider = require('./bancos');
const Cond_IvaProvider = require('./Cond_Iva');
const Tipo_PersonaProvider = require('./Tipo_Persona');
const MonedasProvider = require('./Monedas');
const UsuarioProvider = require('./Usuario');

module.exports = { 
    personasProvider, 
    maestroArticulosProvider,
    insumoProvider,
    pedidosVentaProvider,
    pedidosCompraProvider,
    productosProvider,
    documentoProvider,
    depositosProvider,
    paisesProvider,
    provinciasProvider,
    localidadesProvider,
    bancosProvider,
    Cond_IvaProvider,
    Tipo_PersonaProvider,
    MonedasProvider,
    UsuarioProvider
};