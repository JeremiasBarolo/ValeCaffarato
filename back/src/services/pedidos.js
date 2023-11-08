const { pedidosProvider } = require('../providers');

const listAllPedidos = async () => {
    return await pedidosProvider.listAllPedidos();
};

const listOnePedidos = async (Pedidos_id) => {
    return await pedidosProvider.listOnePedidos(Pedidos_id);
};

const createPedidos = async (PedidosData) => {
    return await pedidosProvider.createPedidos(PedidosData);
};


const updatePedidos = async (Pedidos_id, updatePedidos) => {
    return await pedidosProvider.updatePedidos(Pedidos_id, updatePedidos);
};

const deletePedidos = async (Pedidos_id) => {
    return await pedidosProvider.deletePedidos(Pedidos_id);
};


module.exports = {
    listAllPedidos, listOnePedidos, createPedidos, updatePedidos, deletePedidos, 
};
