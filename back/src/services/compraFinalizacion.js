const { compraFinalizacionProvider } = require('../providers');

const listAllCompraFinalizacion = async () => {
    return await compraFinalizacionProvider.listAllCompraFinalizacion();
};

const listOneCompraFinalizacion = async (compraFinalizacion_id) => {
    return await compraFinalizacionProvider.listOneCompraFinalizacion(compraFinalizacion_id);
};

const createCompraFinalizacion = async (compraFinalizacionData) => {
    return await compraFinalizacionProvider.createCompraFinalizacion(compraFinalizacionData);
};


const updateCompraFinalizacion = async (compraFinalizacion_id, updatecompraFinalizacion) => {
    return await compraFinalizacionProvider.updateCompraFinalizacion(compraFinalizacion_id, updatecompraFinalizacion);
};

const deleteCompraFinalizacion = async (compraFinalizacion_id) => {
    return await compraFinalizacionProvider.deleteCompraFinalizacion(compraFinalizacion_id);
};

const finalizarPedido = async (body) => {
    return await compraFinalizacionProvider.finalizarPedido(body);
};



module.exports = {
    listAllCompraFinalizacion, listOneCompraFinalizacion, createCompraFinalizacion, updateCompraFinalizacion, deleteCompraFinalizacion, finalizarPedido
};
