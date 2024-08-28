

        const { Tipo_ReclamoProvider } = require('../providers');

        const listAllTipo_Reclamo = async () => {
            return await Tipo_ReclamoProvider.listAllTipo_Reclamo();
        };

        const listOneTipo_Reclamo = async (Tipo_Reclamo_id) => {
            return await Tipo_ReclamoProvider.listOneTipo_Reclamo(Tipo_Reclamo_id);
        };

        const createTipo_Reclamo = async (Tipo_ReclamoData) => {
            return await Tipo_ReclamoProvider.createTipo_Reclamo(Tipo_ReclamoData);
        };


        const updateTipo_Reclamo = async (Tipo_Reclamo_id, updateTipo_Reclamo) => {
            return await Tipo_ReclamoProvider.updateTipo_Reclamo(Tipo_Reclamo_id, updateTipo_Reclamo);
        };

        const deleteTipo_Reclamo = async (Tipo_Reclamo_id) => {
            return await Tipo_ReclamoProvider.deleteTipo_Reclamo(Tipo_Reclamo_id);
        };


        module.exports = {
        listAllTipo_Reclamo, listOneTipo_Reclamo, createTipo_Reclamo, updateTipo_Reclamo, deleteTipo_Reclamo, 
        };

