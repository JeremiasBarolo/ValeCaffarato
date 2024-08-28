

        const { ReclamosProvider } = require('../providers');

        const listAllReclamos = async () => {
            return await ReclamosProvider.listAllReclamos();
        };

        const listOneReclamos = async (Reclamos_id) => {
            return await ReclamosProvider.listOneReclamos(Reclamos_id);
        };

        const createReclamos = async (ReclamosData) => {
            return await ReclamosProvider.createReclamos(ReclamosData);
        };


        const updateReclamos = async (Reclamos_id, updateReclamos) => {
            return await ReclamosProvider.updateReclamos(Reclamos_id, updateReclamos);
        };

        const deleteReclamos = async (Reclamos_id) => {
            return await ReclamosProvider.deleteReclamos(Reclamos_id);
        };


        module.exports = {
        listAllReclamos, listOneReclamos, createReclamos, updateReclamos, deleteReclamos, 
        };

