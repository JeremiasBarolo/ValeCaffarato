const { pedidosVentaProvider, pedidosCompraProvider } = require('../providers');

const listAllPedidos = async () => {
    return await pedidosVentaProvider.listAllPedidos();
};

const listOnePedidos = async (Pedidos_id) => {
    return await pedidosVentaProvider.listOnePedidos(Pedidos_id);
};

const createPedidos = async (PedidosData) => {

    if(PedidosData.category === 'VENTA'){
        return await pedidosVentaProvider.createPedidos(PedidosData);
    }else{
        return await pedidosCompraProvider.createPedidos(PedidosData);
    }
};


const updatePedidos = async (Pedidos_id, updatePedidos) => {
    
    if(updatePedidos.category === 'VENTA'){
        return await pedidosVentaProvider.updatePedidos(Pedidos_id, updatePedidos);
    }else{
        return await pedidosCompraProvider.updatePedidos(Pedidos_id, updatePedidos)
    }
};

const deletePedidos = async (Pedidos_id) => {
    return await pedidosVentaProvider.deletePedidos(Pedidos_id);
};


module.exports = {
    listAllPedidos, listOnePedidos, createPedidos, updatePedidos, deletePedidos, 
};
