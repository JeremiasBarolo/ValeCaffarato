const { personasProvider } = require('../providers');

const listAllPersonas = async () => {
    return await personasProvider.listAllPersonas();
};

const listOnePersonas = async (Personas_id) => {
    return await personasProvider.listOnePersonas(Personas_id);
};

const createPersonas = async (PersonasData) => {
    return await personasProvider.createPersonas(PersonasData);
};


const updatePersonas = async (Personas_id, updatePersonas) => {
    return await personasProvider.updatePersonas(Personas_id, updatePersonas);
};

const deletePersonas = async (Personas_id) => {
    return await personasProvider.deletePersonas(Personas_id);
};


module.exports = {
    listAllPersonas, listOnePersonas, createPersonas, updatePersonas, deletePersonas, 
};
