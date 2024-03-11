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

  
    if (dataUpdated.category === 'VENTA' && dataUpdated.state === 'PREPARACION') {
      const cantidades = dataUpdated.productos.map(pedido => ({
        id: pedido.PedidosProductos.productId,
        cantidad: pedido.PedidosProductos.quantity_requested
      }));
    
      for (const entidad of dataUpdated.productos) {
        const entidadProducto = await models.MaestroDeArticulos.findByPk(entidad.id, {
          include: { all: true },
        });
    
        if (entidadProducto) {
          const cantidadRequerida = cantidades.reduce((total, c) => {
            if (c.id === entidadProducto.id) {
              return total + c.cantidad;
            }
            return total;
          }, 0);
    
    
          for (const insumo of entidadProducto.ProductosEnStocks) {
            const cantidadNecesaria = insumo.ProductQuantities.quantity_necessary;
            const cantidadActual = cantidadNecesaria * cantidadRequerida;
    
    
            await insumo.update({
              quantity: insumo.quantity - cantidadActual,
              quantity_reserved: insumo.quantity_reserved + cantidadActual
            });
          }
        }
      }
    
      
      const newPedidos = await oldPedidos.update(dataUpdated);
    }
    
    
    

    
    else if (
      (dataUpdated.category === 'VENTA' && dataUpdated.state === 'FINALIZADO') ||
      (dataUpdated.category === 'VENTA' && dataUpdated.devolverInsumos)
     ) {

      
      // <======================== actualizar cantidades en insumos ====================>

      const insumosToUpdate = [];
    
      for (const entidad of dataUpdated.productos) {
        const entidadProducto = await models.MaestroDeArticulos.findByPk(entidad.id, {
          include: { all: true },
        });
    
        if (entidadProducto) {
          const cantidadRequerida = entidad.PedidosProductos.quantity_requested;
    
          for (const insumo of entidadProducto.ProductosEnStocks) {
            const cantidadNecesaria = insumo.ProductQuantities.quantity_necessary;
            const cantidadActual = cantidadNecesaria * cantidadRequerida;
    
            insumosToUpdate.push({
              insumo,
              cantidadActual,
            });
          }
        }
      }
    
      
      const groupedUpdates = insumosToUpdate.reduce((acc, { insumo, cantidadActual }) => {
        const key = insumo.id;
        if (!acc[key]) {
          acc[key] = { insumo, total: 0 };
        }
        acc[key].total += cantidadActual;
        return acc;
      }, {});
    
      
      const updatePromises = Object.values(groupedUpdates).map(async ({ insumo, total }) => {
        const newReservedQuantity = Math.max(0, insumo.quantity_reserved - total);
        const newQuantity = dataUpdated.devolverInsumos ? insumo.quantity + total : insumo.quantity;
    
        return insumo.update({
          quantity_reserved: newReservedQuantity,
          quantity: newQuantity,
        });
      });
    
      await Promise.all(updatePromises);


      

      const newPedidos = await oldPedidos.update(dataUpdated);
    }
    
    



    else if (dataUpdated.eliminarCantidad)
    {
      const pedidoFinalizado = await models.Pedidos.findOne({
        where: {
            id: pedidos_id, 
            state: 'FINALIZADO' 
        }
      });
    
    if (pedidoFinalizado) {
        
        const productosPedido = await models.PedidosProductos.findAll({
            where: {
                pedidoId: pedidoFinalizado.id
            }
        });
    
        
        let diferenciaSuficiente = true;
        for (const productoPedido of productosPedido) {
            const productoInsumo = await models.ProductosEnStock.findByPk(productoPedido.productId);
            const diferencia = productoInsumo.quantity - productoInsumo.quantity_reserved;
            if (diferencia < productoPedido.quantity_requested) {
                diferenciaSuficiente = false;
                break;
            }
        }
    
        if (diferenciaSuficiente) {
            
            for (const productoPedido of productosPedido) {
                const productoInsumo = await models.ProductosEnStock.findByPk(productoPedido.productId);
                await productoInsumo.decrement('quantity', { by: productoPedido.quantity_requested });
            }

            await pedidoFinalizado.destroy();
    
            return "Pedido finalizado eliminado y cantidad revertida en la tabla de productos en stock.";
        } else {
            return "No se puede eliminar el pedido finalizado porque no hay suficiente cantidad disponible.";
        }
    } else {
        return "No se encontró un pedido finalizado con el ID proporcionado.";
    }
      
    }

    

    else {
      
      if (dataUpdated.editPresupuesto) {
        const productosExistente = await models.PedidosProductos.findAll({
            where: {
                pedidoId: dataUpdated.id
            }
        });
    
        const idsProductosExistente = productosExistente.map(producto => producto.productId);
    
        
        for (const entidad of dataUpdated.productos) {
           
            if (idsProductosExistente.includes(entidad.id)) {
                
                const producto = productosExistente.find(p => p.productId === entidad.id);
                await producto.update({
                    quantity_requested: entidad.cantidad
                });
                
                const index = idsProductosExistente.indexOf(entidad.id);
                if (index > -1) {
                    idsProductosExistente.splice(index, 1);
                }
            } else {
                
                await models.PedidosProductos.create({
                    pedidoId: dataUpdated.id,
                    productId: entidad.id,
                    quantity_requested: entidad.cantidad
                });
            }
        }
    
        
        for (const idProductoNoPresente of idsProductosExistente) {
            const productoEliminar = productosExistente.find(p => p.productId === idProductoNoPresente);
            await productoEliminar.destroy();
        }
    }
    
    
    const newPedidos = await oldPedidos.update(dataUpdated);
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
      for (const producto of deletedPedidos.productos) {
      
        await models.PedidosProductos.destroy({ where:  
          { 
            quantity_requested: producto.PedidosProductos.quantity_requested, 
            productId: producto.PedidosProductos.productId, 
            pedidoId: producto.PedidosProductos.pedidoId 
          } });
      
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
