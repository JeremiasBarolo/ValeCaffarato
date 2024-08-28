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
      include: { all: true },
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

const createPedidos= async (PedidosData) => {
  

  try {
    
    
    const dataPedidos= {
      name: PedidosData.name,
      description: PedidosData.description,
      subtotal: PedidosData.subtotal,
      category: PedidosData.category,
      state: PedidosData.state,
      personaId: PedidosData.personaId,
    };

    const newPedidos= await models.Pedidos.create({...dataPedidos, monedaId: parseInt(PedidosData.monedaId, 10), personaId: parseInt(PedidosData.personaId, 10)});

    const insumosData = PedidosData.productos.map(item => ({
        id: item.id,
        cantidad: item.cantidad
      }));

    

    for (const insumo of insumosData) {
        const insumoEntity = await models.MaestroDeArticulos.findByPk(insumo.id);
        if (insumoEntity) {
          await models.PedidosProductos.create({
            pedidoId: newPedidos.id,
            productId: insumo.id,
            quantity_requested: insumo.cantidad
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
    
      if(dataUpdated.editPresupuesto){
        await dataUpdated.productos.map(async entidad => {
          const producto = await models.PedidosProductos.findOne(
            {
              where: {
                pedidoId: dataUpdated.id,
                productId: entidad.id
              }
            }
          )
  
          if(producto){
            await producto.update({
              quantity_requested: entidad.cantidad
            })
          }
        })
      }

      if(dataUpdated.eliminarCantidad){
        await utilsService.EliminarPedidoCompra(pedidos_id)
        return oldPedidos;
      }
      
      const newPedidos= await oldPedidos.update(dataUpdated);
      return newPedidos;
    
    


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
      for (const producto of deletedPedidos.productos) {
      
        await models.PedidosProductos.destroy({ where:  
          { 
            quantity_requested: producto.PedidosProductos.quantity_requested, 
            productId: producto.PedidosProductos.productId, 
            pedidoId: producto.PedidosProductos.pedidoId 
          } });
      
    }
  

    
    await models.Pedidos.update({ state: 'CANCELADO' });

    console.log(`✅ Pedidos with id: ${pedidos_id} was deleted successfully`);
    return deletedPedidos;
  } catch (err) {
    console.error('🛑 Error when deleting Pedidos', err);
    throw err;
  }
};


module.exports = {
  listAllPedidos, listOnePedidos, createPedidos, updatePedidos, deletePedidos,
};
