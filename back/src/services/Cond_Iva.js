

        const { Cond_IvaProvider } = require('../providers');

        const listAllCond_Iva = async () => {
            return await Cond_IvaProvider.listAllCond_Iva();
        };

        const listOneCond_Iva = async (Cond_Iva_id) => {
            return await Cond_IvaProvider.listOneCond_Iva(Cond_Iva_id);
        };

        const createCond_Iva = async (Cond_IvaData) => {
            return await Cond_IvaProvider.createCond_Iva(Cond_IvaData);
        };


        const updateCond_Iva = async (Cond_Iva_id, updateCond_Iva) => {
            return await Cond_IvaProvider.updateCond_Iva(Cond_Iva_id, updateCond_Iva);
        };

        const deleteCond_Iva = async (Cond_Iva_id) => {
            return await Cond_IvaProvider.deleteCond_Iva(Cond_Iva_id);
        };


        module.exports = {
        listAllCond_Iva, listOneCond_Iva, createCond_Iva, updateCond_Iva, deleteCond_Iva, 
        };

