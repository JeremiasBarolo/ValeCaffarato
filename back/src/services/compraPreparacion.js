const { compraPreparacionProvider } = require('../providers');

const listAllCompraPreparacion = async () => {
    return await compraPreparacionProvider.listAllCompraPreparacion();
};

const listOneCompraPreparacion = async (compraPreparacion_id) => {
    return await compraPreparacionProvider.listOneCompraPreparacion(compraPreparacion_id);
};

const createCompraPreparacion = async (compraPreparacionData) => {
    return await compraPreparacionProvider.createCompraPreparacion(compraPreparacionData);
};


const updateCompraPreparacion = async (compraPreparacion_id, updatecompraPreparacion) => {
    return await compraPreparacionProvider.updateCompraPreparacion(compraPreparacion_id, updatecompraPreparacion);
};

const deleteCompraPreparacion = async (compraPreparacion_id) => {
    return await compraPreparacionProvider.deleteCompraPreparacion(compraPreparacion_id);
};


module.exports = {
    listAllCompraPreparacion, listOneCompraPreparacion, createCompraPreparacion, updateCompraPreparacion, deleteCompraPreparacion, 
};
