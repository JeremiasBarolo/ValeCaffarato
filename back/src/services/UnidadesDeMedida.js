

        const { UnidadesDeMedidaProvider } = require('../providers');

        const listAllUnidadesDeMedida = async () => {
            return await UnidadesDeMedidaProvider.listAllUnidadesDeMedida();
        };

        const listOneUnidadesDeMedida = async (UnidadesDeMedida_id) => {
            return await UnidadesDeMedidaProvider.listOneUnidadesDeMedida(UnidadesDeMedida_id);
        };

        const createUnidadesDeMedida = async (UnidadesDeMedidaData) => {
            return await UnidadesDeMedidaProvider.createUnidadesDeMedida(UnidadesDeMedidaData);
        };


        const updateUnidadesDeMedida = async (UnidadesDeMedida_id, updateUnidadesDeMedida) => {
            return await UnidadesDeMedidaProvider.updateUnidadesDeMedida(UnidadesDeMedida_id, updateUnidadesDeMedida);
        };

        const deleteUnidadesDeMedida = async (UnidadesDeMedida_id) => {
            return await UnidadesDeMedidaProvider.deleteUnidadesDeMedida(UnidadesDeMedida_id);
        };


        module.exports = {
        listAllUnidadesDeMedida, listOneUnidadesDeMedida, createUnidadesDeMedida, updateUnidadesDeMedida, deleteUnidadesDeMedida, 
        };

