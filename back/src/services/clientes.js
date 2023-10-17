const { clientesProvider } = require('../providers');

const listAllCliente = async () => {
    return await clientesProvider.listAllCliente();
};

const listOneCliente = async (Cliente_id) => {
    return await clientesProvider.listOneCliente(Cliente_id);
};

const createCliente = async (ClienteData) => {
    return await clientesProvider.createCliente(ClienteData);
};


const updateCliente = async (Cliente_id, updateCliente) => {
    return await clientesProvider.updateCliente(Cliente_id, updateCliente);
};

const deleteCliente = async (Cliente_id) => {
    return await clientesProvider.deleteCliente(Cliente_id);
};


module.exports = {
 listAllCliente, listOneCliente, createCliente, updateCliente, deleteCliente, 
};
