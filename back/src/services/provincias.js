const { provinciasProvider } = require('../providers');

const listAllProvincias = async () => {
    return await provinciasProvider.listAllProvincias();
};

const listOneProvincias = async (Provincias_id) => {
    return await provinciasProvider.listOneProvincias(Provincias_id);
};

const createProvincias = async (ProvinciasData) => {
    return await provinciasProvider.createProvincias(ProvinciasData);
};


const updateProvincias = async (Provincias_id, updateProvincias) => {
    return await provinciasProvider.updateProvincias(Provincias_id, updateProvincias);
};

const deleteProvincias = async (Provincias_id) => {
    return await provinciasProvider.deleteProvincias(Provincias_id);
};


module.exports = {
 listAllProvincias, listOneProvincias, createProvincias, updateProvincias, deleteProvincias, 
};
