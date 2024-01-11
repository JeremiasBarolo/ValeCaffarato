const { depositosProvider } = require('../providers');

const listAllDepositos = async () => {
    return await depositosProvider.listAllDepositos();
};

const listOneDepositos = async (Depositos_id) => {
    return await depositosProvider.listOneDepositos(Depositos_id);
};

const createDepositos = async (DepositosData) => {
    return await depositosProvider.createDepositos(DepositosData);
};


const updateDepositos = async (Depositos_id, updateDepositos) => {
    return await depositosProvider.updateDepositos(Depositos_id, updateDepositos);
};

const deleteDepositos = async (Depositos_id) => {
    return await depositosProvider.deleteDepositos(Depositos_id);
};


module.exports = {
 listAllDepositos, listOneDepositos, createDepositos, updateDepositos, deleteDepositos, 
};
