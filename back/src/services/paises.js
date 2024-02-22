const { paisesProvider } = require('../providers');

const listAllPaises = async () => {
    return await paisesProvider.listAllPaises();
};

const listOnePaises = async (Paises_id) => {
    return await paisesProvider.listOnePaises(Paises_id);
};

const createPaises = async (PaisesData) => {
    return await paisesProvider.createPaises(PaisesData);
};


const updatePaises = async (Paises_id, updatePaises) => {
    return await paisesProvider.updatePaises(Paises_id, updatePaises);
};

const deletePaises = async (Paises_id) => {
    return await paisesProvider.deletePaises(Paises_id);
};


module.exports = {
 listAllPaises, listOnePaises, createPaises, updatePaises, deletePaises, 
};
