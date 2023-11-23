var models = require('../models');
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
      state: PedidosData.state  
    };

    

    if(PedidosData.category === 'COMPRA'){

        const newPedidos= await models.Pedidos.create(dataPedidos);

        const insumosData = PedidosData.insumosEntity_id.map(item => ({
            insumoEntityId: item.id,
            cantidad: item.cantidad
          }));

        

        for (const insumo of insumosData) {
            const insumoEntity = await models.InsumosEntities.findByPk(insumo.insumoEntityId);
            if (insumoEntity) {
              await models.PedidosInsumos.create({
                pedidoId: newPedidos.id,
                insumoEntityId: insumo.insumoEntityId,
                cantidad: insumo.cantidad
              });
            }
        }
        console.log(`✅ Pedidos"${newPedidos.name}" was created with images`);
        return newPedidos;
  }else{  

          const newPedidos= await models.Pedidos.create(dataPedidos);
          const productData = PedidosData.productos.map(item => ({
            productEntityId: item.id,
            cantidad: item.cantidad
          }));


          for (const product of productData) {
            const insumoEntity = await models.ProductEntity.findByPk(product.productEntityId);
            if (insumoEntity) {
              await models.PedidosProductos.create({
                pedidoId: newPedidos.id,
                productEntityId: product.productEntityId,
                quantity_requested: product.cantidad
              });
            }
        }
        console.log(`✅ Pedidos"${newPedidos.name}" was created with images`);
        return newPedidos;
  }

    
    
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
    


    if(dataUpdated.category === 'VENTA' && dataUpdated.state == 'PREPARACION'){
      
      const cantidades = dataUpdated.productos.map(pedido => ({
        id : pedido.PedidosProductos.productEntityId,
        cantidad : pedido.PedidosProductos.quantity_requested
      } 
      ))

      await dataUpdated.productos.map(async entidad => {
        const entidadProducto =  await models.ProductEntity.findByPk(entidad.id, {
          include: { all: true },
        });

          if (entidadProducto) {
            await entidadProducto.Insumos.map(async insumo => {
              const cantidadNecesaria = insumo.ProductEntityQuantities.quantity_necessary
              const cantidadRequerida = cantidades.find(c => c.id === entidadProducto.id).cantidad    
              const cantidadActual = cantidadNecesaria * cantidadRequerida    
                await insumo.update({
                  quantity: insumo.quantity - cantidadActual,
                  quantity_reserved: insumo.quantity_reserved + cantidadActual
                })
            })
          }
        return newPedidos= await oldPedidos.update(dataUpdated);
      } 
      )
     
    }
    
    else if(dataUpdated.category === 'VENTA' && dataUpdated.state == 'FINALIZADO' || dataUpdated.category === 'VENTA' && dataUpdated.devolverInsumos){
        const cantidades = dataUpdated.productos.map(pedido => ({
          id : pedido.PedidosProductos.productEntityId,
          cantidad : pedido.PedidosProductos.quantity_requested
        } 
        ))

        await dataUpdated.productos.map(async entidad => {
          const entidadProducto =  await models.ProductEntity.findByPk(entidad.id, {
            include: { all: true },
          })
      
        if (entidadProducto) {
          await entidadProducto.Insumos.map(async insumo => {  
            const cantidadNecesaria = insumo.ProductEntityQuantities.quantity_necessary
            const cantidadRequerida = cantidades.find(c => c.id === entidadProducto.id).cantidad

            const cantidadActual = cantidadNecesaria * cantidadRequerida

            if(dataUpdated.devolverInsumos){
            await insumo.update({
              quantity_reserved: insumo.quantity_reserved - cantidadActual,
              quantity: insumo.quantity + cantidadActual
            })
          }else{
            await insumo.update({
              quantity_reserved: insumo.quantity_reserved - cantidadActual
            })
          }
          })
        
        }
      return newPedidos= await oldPedidos.update(dataUpdated);


    })
  }
  
    else{
      const newPedidos= await oldPedidos.update(dataUpdated);
      return newPedidos;
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

    if(deletedPedidos.category === 'COMPRA'){
      for (const insumo of deletedPedidos.insumos) {
      
        await models.PedidosInsumos.destroy({ where:  
          { 
            cantidad: insumo.PedidosInsumos.cantidad, 
            insumoEntityId: insumo.PedidosInsumos.insumoEntityId, 
            pedidoId: insumo.PedidosInsumos.pedidoId 
          } });
      }
    }else{
      for (const producto of deletedPedidos.productos) {
      
        await models.PedidosProductos.destroy({ where:  
          { 
            quantity_requested: producto.PedidosProductos.quantity_requested, 
            productEntityId: producto.PedidosProductos.productEntityId, 
            pedidoId: producto.PedidosProductos.pedidoId 
          } });
      }
    }
    

    
    await models.Pedidos.destroy({ where: { id: pedidos_id } });

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
