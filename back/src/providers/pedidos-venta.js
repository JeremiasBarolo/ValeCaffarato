const { where } = require('sequelize');
var models = require('../models');
const UtilsService = require('../classes/utils');
const utilsService = new UtilsService();


const listAllPedidos= async () => {
  try {
    const Pedidos = await models.Pedidos.findAll(
       {
        include: { all: true },
       },
    );
    console.log('✅ Pedidos were found');
    return Pedidos;
  } catch (err) {
    console.error('🛑 Error when fetching Pedidos', err);
    throw err;
  }
};

const listOnePedidos= async (pedidos_id) => {
  try {
    const onePedidos= await models.Pedidos.findByPk(pedidos_id, {
      include: [
        { all: true }, 
      ],
    });
    if (!onePedidos) {
      console.error(`🛑 Pedidoswith id ${pedidos_id} not found`);
      return null;
    }
    return onePedidos;
  } catch (err) {
    console.error('🛑 Error when fetching Pedidos', err);
    throw err;
  }
};

const createPedidos = async (PedidosData) => {
  

  try {
    
    
    const dataPedidos= {
      name: PedidosData.name,
      description: PedidosData.description,
      subtotal: PedidosData.subtotal,
      category: PedidosData.category,
      state: PedidosData.state  
    };

    const newPedidos= await models.Pedidos.create({...dataPedidos, monedaId: parseInt(PedidosData.monedaId, 10), personaId: parseInt(PedidosData.personaId, 10)});
    const productData = PedidosData.productos.map(item => ({
      productId: item.id,
      cantidad: item.cantidad
    }));


    
    for (const product of productData) {
      const insumoEntity = await models.MaestroDeArticulos.findByPk(product.productId);
      if (insumoEntity) {
        await models.PedidosProductos.create({
          pedidoId: newPedidos.id,
          productId: product.productId,
          quantity_requested: product.cantidad
        });
      }
  }
  console.log(`✅ Pedidos"${newPedidos.name}" was created with images`);
  return newPedidos;
  

  } catch (err) {
    console.error('🛑 Error when creating Pedidos', err);
    throw err;
  }
};

const updatePedidos= async (pedidos_id, dataUpdated) => {
  

  try {

    const oldPedidos= await models.Pedidos.findByPk(pedidos_id, 
        { include: { all: true } 
    });

    if(dataUpdated.devolverInsumos){
      await utilsService.devolverInsumos(pedidos_id, dataUpdated, oldPedidos)
      await oldPedidos.update({
        state: 'CANCELADO'
      })
    }
    
    // cuando pasamos a PREPARACION
    if (dataUpdated.category === 'VENTA' && dataUpdated.state === 'PREPARACION') {
      
      await utilsService.pedidoVentaPreparacion(pedidos_id, dataUpdated, oldPedidos)
    }

    // cuando pasamos a listo para finalizar
    if (dataUpdated.category === 'VENTA' && dataUpdated.state === 'LISTO PARA FINALIZAR') {
      
      await utilsService.pedidoVentaListoParaFinalizar(pedidos_id, dataUpdated, oldPedidos)
    }
    
    
    

    // cuando pasamos a finalizar
    else if (dataUpdated.category === 'VENTA' && dataUpdated.state === 'FINALIZAR'){

      await utilsService.finalizarPedidoVenta(pedidos_id, dataUpdated, oldPedidos)
      
    }
    
    



    else if (dataUpdated.eliminarCantidad){

      await utilsService.eliminarCantidad(pedidos_id, dataUpdated, oldPedidos)

    }

    

    else {
      await utilsService.editarPedidoVenta(pedidos_id, dataUpdated, oldPedidos)
  }  
    


  } catch (err) {
    console.error('🛑 Error when updating Pedidos', err);
    throw err;
  }
};

const deletePedidos = async (pedidos_id) => {
  try {
    const deletedPedidos = await models.Pedidos.findByPk(pedidos_id, 
      { include: { all: true } ,
    });

    if (!deletedPedidos) {
      console.error(`🛑 Pedidos with id: ${pedidos_id} not found`);
      return null;
    }

    if(deletedPedidos.state === 'CANCELADO'){
      eliminarPedidoBBDD(pedidos_id);
    }
    
    await deletedPedidos.update({ state: 'CANCELADO' });

    console.log(`✅ Pedidos with id: ${pedidos_id} was deleted successfully`);
    return deletedPedidos;
  } catch (err) {
    console.error('🛑 Error when deleting Pedidos', err);
    throw err;
  }



  
};

const eliminarPedidoBBDD = async (pedidos_id) => {
  try {
    const deletedPedidos = await models.Pedidos.findByPk(pedidos_id, 
      { include: { all: true } ,
    });

    if (!deletedPedidos) {
      console.error(`🛑 Pedidos with id: ${pedidos_id} not found`);
      return null;
    }


    for (const producto of deletedPedidos.productos) {
      
        await models.PedidosProductos.destroy({ where:  
          { 
            quantity_requested: producto.PedidosProductos.quantity_requested, 
            productId: producto.PedidosProductos.productId, 
            pedidoId: producto.PedidosProductos.pedidoId 
          } });
      
    }
  

    
    await deletedPedidos.destroy();

    console.log(`✅ Pedidos with id: ${pedidos_id} was deleted successfully`);
    return deletedPedidos;
  } catch (err) {
    console.error('🛑 Error when deleting Pedidos', err);
    throw err;
  }


}

module.exports = {
  listAllPedidos, listOnePedidos, createPedidos, updatePedidos, deletePedidos, eliminarPedidoBBDD, 
};
