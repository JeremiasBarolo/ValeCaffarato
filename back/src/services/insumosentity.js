const { insumosentityProvider } = require('../providers');

const listAllInsumosentity = async () => {
    return await insumosentityProvider.listAllInsumosentity();
};

const listOneInsumosentity = async (insumosentity_id) => {
    return await insumosentityProvider.listOneInsumosentity(insumosentity_id);
};

const createInsumosentity = async (insumosentityData) => {
    return await insumosentityProvider.createInsumosentity(insumosentityData);
};


const updateInsumosentity = async (insumosentity_id, updateinsumosentity) => {
    return await insumosentityProvider.updateInsumosentity(insumosentity_id, updateinsumosentity);
};

const deleteInsumosentity = async (insumosentity_id) => {
    return await insumosentityProvider.deleteInsumosentity(insumosentity_id);
};


module.exports = {
    listAllInsumosentity, listOneInsumosentity, createInsumosentity, updateInsumosentity, deleteInsumosentity, 
};
