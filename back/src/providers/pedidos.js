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
  }else{  

          const newPedidos= await models.Pedidos.create(dataPedidos);
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
    
    
          for (const insumo of entidadProducto.Insumos) {
            const cantidadNecesaria = insumo.ProductQuantities.quantity_necessary;
            const cantidadActual = cantidadNecesaria * cantidadRequerida;
    
            console.log(`Insumo ${insumo.name}: Necesaria=${cantidadNecesaria}, Actual=${cantidadActual}`);
    
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

      // <======================== agregar productos ====================>
      await oldPedidos.productos.map(async product => {
        const existe = await models.Productos.findOne({
          where: {
            antiguo_id: product.PedidosProductos.productId
          }
        })

        if(existe){
          const suma = existe.quantity + product.PedidosProductos.quantity_requested
          await existe.update({
            quantity: suma
          })
        }else{

          await models.Productos.create({
            name: product.name,
            description: product.description,
            costo_unit: product.costo_unit,
            profit: product.profit,
            quantity: product.PedidosProductos.quantity_requested,
            unidad_medida: product.uni_medida,
            antiguo_id: product.PedidosProductos.productId
          })
        }

        
      });





      // <======================== actualizar cantidades en insumos ====================>

      const insumosToUpdate = [];
    
      for (const entidad of dataUpdated.productos) {
        const entidadProducto = await models.MaestroDeArticulos.findByPk(entidad.id, {
          include: { all: true },
        });
    
        if (entidadProducto) {
          const cantidadRequerida = entidad.PedidosProductos.quantity_requested;
    
          for (const insumo of entidadProducto.Insumos) {
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
    
    


    

    else {
      
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
