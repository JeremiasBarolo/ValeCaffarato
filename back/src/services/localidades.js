const { localidadesProvider } = require('../providers');

const listAllLocalidades = async () => {
    return await localidadesProvider.listAllLocalidades();
};

const listOneLocalidades = async (Localidades_id) => {
    return await localidadesProvider.listOneLocalidades(Localidades_id);
};

const createLocalidades = async (LocalidadesData) => {
    return await localidadesProvider.createLocalidades(LocalidadesData);
};


const updateLocalidades = async (Localidades_id, updateLocalidades) => {
    return await localidadesProvider.updateLocalidades(Localidades_id, updateLocalidades);
};

const deleteLocalidades = async (Localidades_id) => {
    return await localidadesProvider.deleteLocalidades(Localidades_id);
};


module.exports = {
 listAllLocalidades, listOneLocalidades, createLocalidades, updateLocalidades, deleteLocalidades, 
};
