const { productentityProvider } = require('../providers');

const listAllProductentity = async () => {
    return await productentityProvider.listAllProductentity();
};

const listOneProductentity = async (productentity_id) => {
    return await productentityProvider.listOneProductentity(productentity_id);
};

const createProductentity = async (productentityData) => {
    return await productentityProvider.createProductentity(productentityData);
};


const updateProductentity = async (productentity_id, updateProductentity) => {
    return await productentityProvider.updateProductentity(productentity_id, updateProductentity);
};

const deleteProductentity = async (productentity_id) => {
    return await productentityProvider.deleteProductentity(productentity_id);
};


module.exports = {
 listAllProductentity, listOneProductentity, createProductentity, updateProductentity, deleteProductentity, 
};
