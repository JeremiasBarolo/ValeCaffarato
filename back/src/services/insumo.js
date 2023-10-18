const { insumoProvider } = require('../providers');

const listAllInsumo = async () => {
    return await insumoProvider.listAllInsumo();
};

const listOneInsumo = async (insumo_id) => {
    return await insumoProvider.listOneInsumo(insumo_id);
};

const createInsumo = async (insumoData) => {
    return await insumoProvider.createInsumo(insumoData);
};


const updateInsumo = async (insumo_id, updateinsumo) => {
    return await insumoProvider.updateInsumo(insumo_id, updateinsumo);
};

const deleteInsumo = async (insumo_id) => {
    return await insumoProvider.deleteInsumo(insumo_id);
};


module.exports = {
    listAllInsumo, listOneInsumo, createInsumo, updateInsumo, deleteInsumo, 
};
