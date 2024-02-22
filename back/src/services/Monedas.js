

        const { MonedasProvider } = require('../providers');

        const listAllMonedas = async () => {
            return await MonedasProvider.listAllMonedas();
        };

        const listOneMonedas = async (Monedas_id) => {
            return await MonedasProvider.listOneMonedas(Monedas_id);
        };

        const createMonedas = async (MonedasData) => {
            return await MonedasProvider.createMonedas(MonedasData);
        };


        const updateMonedas = async (Monedas_id, updateMonedas) => {
            return await MonedasProvider.updateMonedas(Monedas_id, updateMonedas);
        };

        const deleteMonedas = async (Monedas_id) => {
            return await MonedasProvider.deleteMonedas(Monedas_id);
        };


        module.exports = {
        listAllMonedas, listOneMonedas, createMonedas, updateMonedas, deleteMonedas, 
        };

