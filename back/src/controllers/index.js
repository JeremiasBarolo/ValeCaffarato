// Index of routes
const personasController = require('./personas');
const pedidosController = require('./pedidos');
const cantidadesController = require('./cantidades');
const productosController = require('./producto');
const documentoController = require('./documentos');
const maestroArticulosController = require('./maestro-articulos');
const depositosController = require('./depositos');
const paisesController = require('./paises');
const provinciasController = require('./provincias');
const localidadesController = require('./localidades');
const bancosController = require('./bancos');
const Tipo_PersonaController = require('./Tipo_Persona');
const Cond_IvaController = require('./Cond_Iva');
const MonedasController = require('./Monedas');
const UsuarioController = require('./Usuario');
const loginController = require('./login');



module.exports = { 
    personasController,
    pedidosController,
    cantidadesController,
    productosController,
    documentoController,
    maestroArticulosController,
    depositosController,
    paisesController,
    provinciasController,
    localidadesController,
    bancosController,
    Tipo_PersonaController,
    Cond_IvaController,
    MonedasController,
    UsuarioController,
    loginController
};