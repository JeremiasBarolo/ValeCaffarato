const personasService = require('./personas');
const pedidosService = require('./pedidos');
const productosService = require('./producto');
const documentoService = require('./documentos');
const maestroArticulosService = require('./maestro-articulos');
const depositosService = require('./depositos');
const paisesService = require('./paises');
const provinciasService = require('./provincias');
const localidadesService = require('./localidades');
const bancosService = require('./bancos');
const Tipo_PersonaService = require('./Tipo_Persona');
const Cond_IvaService = require('./Cond_Iva');
const MonedasService = require('./Monedas');
const UsuarioService = require('./Usuario');

module.exports = {
    personasService,
    pedidosService,
    productosService,
    documentoService,
    maestroArticulosService,
    depositosService,
    paisesService,
    provinciasService,
    localidadesService,
    bancosService,
    Tipo_PersonaService,
    Cond_IvaService,
    MonedasService,
    UsuarioService
};