const { bancosProvider } = require('../providers');

const listAllBancos = async () => {
    return await bancosProvider.listAllBancos();
};

const listOneBancos = async (Bancos_id) => {
    return await bancosProvider.listOneBancos(Bancos_id);
};

const createBancos = async (BancosData) => {
    return await bancosProvider.createBancos(BancosData);
};


const updateBancos = async (Bancos_id, updateBancos) => {
    return await bancosProvider.updateBancos(Bancos_id, updateBancos);
};

const deleteBancos = async (Bancos_id) => {
    return await bancosProvider.deleteBancos(Bancos_id);
};


module.exports = {
 listAllBancos, listOneBancos, createBancos, updateBancos, deleteBancos, 
};
