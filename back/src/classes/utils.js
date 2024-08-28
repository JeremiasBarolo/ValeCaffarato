var models = require('../models');



class UtilsService {
  
    async returnTipoPersonaId(tipoPersona){
      if(tipoPersona === 'cliente'){
        return 3
      }else if(tipoPersona === 'proveedor'){
        return 2
      }else{
        return 1
      }
    }

    async devolverInsumos(pedidos_id, dataUpdated, oldPedidos) {
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
    }

    

    async pedidoVentaPreparacion(pedidos_id, dataUpdated, oldPedidos) {
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
        
          
        await oldPedidos.update(dataUpdated);
    }

    async pedidoVentaListoParaFinalizar(pedidos_id, dataUpdated, oldPedidos) {
      
      await this.devolverInsumos(pedidos_id, dataUpdated, oldPedidos)

      // creando productos
      for(const producto of dataUpdated.productos){
       
        const checkProduct = await models.ProductosEnStock.findOne({
          where: {
            antiguo_id: producto.id
          }
        });
        
        // Si exite..
        if (checkProduct) {
          const cantidadNueva = checkProduct.quantity + producto.PedidosProductos.quantity_requested;
          const updatedProduct = await checkProduct.update({
            quantity: cantidadNueva,
            depositoId: parseInt(dataUpdated.depositoId, 10)
          });
          
        } else {
          // Si no existe...
          const newProduct = await models.ProductosEnStock.create({
            quantity: producto.PedidosProductos.quantity_requested,
            name: producto.name,
            description: producto.description,
            costo_unit: producto.costo_unit,
            profit: producto.profit,
            antiguo_id: producto.id,
            type: 'PRODUCTO',
            uni_medida: producto.uni_medida,
            quantity_reserved: 0 ,
            depositoId: parseInt(dataUpdated.depositoId, 10)
            
          });
          
        }


      }


      const dataDocumento= {
        iva: 1,
        totalIva: 1,
        total: dataUpdated.subtotal,
        condicionIva: 'CONTADO',
        tipo: ['FACTURA','REMITO'],
      };
      
      for(const documento of dataDocumento.tipo){
        const newDocumento= await models.Documentos.create({
          ...dataDocumento,
          tipo: documento
        });

        await models.PedidoDocumentos.create({
          documentoId: newDocumento.id,
            pedidoId: dataUpdated.id
          })
        
    
        await models.PersonaDocumentos.create({
          personaId: dataUpdated.Persona.id,
          documentoId: newDocumento.id
        })
      }
  
      
     
      
        
      

      await oldPedidos.update(dataUpdated);
    }


    async EliminarPedidoCompra(pedidos_id) {

        const pedidoFinalizado = await models.Pedidos.findOne({
            where: {
                id: pedidos_id, 
                state: 'FINALIZADO' 
            }
          });
        
            if (pedidoFinalizado && pedidoFinalizado.category === 'COMPRA' ) {
                
                const productosPedido = await models.PedidosProductos.findAll({
                    where: {
                        pedidoId: pedidoFinalizado.id
                    }
                });
            
                
                let diferenciaSuficiente = true;
                for (const productoPedido of productosPedido) {
    
                    const productoInsumo = await models.ProductosEnStock.findOne({
                      where: { antiguo_id:productoPedido.productId }
                    })
    
                    const diferencia = productoInsumo.quantity - productoInsumo.quantity_reserved;
                    if (diferencia < productoPedido.quantity_requested) {
                        diferenciaSuficiente = false;
                        break;
                    }
                }
            
                if (diferenciaSuficiente) {
                    
                    for (const productoPedido of productosPedido) {
                        const productoInsumo = await models.ProductosEnStock.findOne({
                            where: { antiguo_id:productoPedido.productId }
                        })
    
                        let total = productoInsumo.quantity - productoPedido.quantity_requested 
                        
                        if(total < 0 || total === 0 ){
                          await productoInsumo.destroy()
                        }else{
                          await productoInsumo.update({
                            quantity: total
                          })
                        }
                    }
    
                    await pedidoFinalizado.update({
                      state: 'CANCELADO'
                    })
            
                    return "Pedido finalizado eliminado y cantidad revertida en la tabla de productos en stock.";
                } else {
                  throw new Error("No se puede eliminar el pedido finalizado porque no hay suficiente cantidad disponible.");
                }
            } else {
              const productosPedido = await models.PedidosProductos.findAll({
                where: {
                    pedidoId: pedidoFinalizado.id
                }
              });
    
              for (const productoPedido of productosPedido) {
    
                const productoInsumo = await models.ProductosEnStock.findOne({
                  where: { antiguo_id:productoPedido.productId }
                })
    
                const total = productoInsumo.quantity - productoPedido.quantity_requested
    
                if(total < 0 || total === 0 ){
                  await productoInsumo.destroy()
                }else{
                  await productoInsumo.update({
                    quantity: total
                  })
                }
            }
    
            
            await pedidoFinalizado.update({
              state: 'CANCELADO'
            })
        }
    }

    async editarPedidoVenta(pedidos_id, dataUpdated, oldPedidos) {
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

      async finalizarPedidoVenta(pedidos_id, dataUpdated, oldPedidos) {

        for(const producto of dataUpdated.productos){
          const PT = await models.ProductosEnStock.findOne({
            where: {
              antiguo_id: producto.id
            }
          });

          PT.quantity - producto.PedidosProductos.quantity_requested === 0 ?

          await PT.destroy()

          :
          await PT.update({
            quantity: PT.quantity - producto.PedidosProductos.quantity_requested
            
          })
          
        }

       await oldPedidos.update({
          state: 'FINALIZADO'
        });
        
      }

      async calcularCostoUnitarioEntidadProducto(ganancia, productos){
        let subtotal = 0; 

        for (const producto of productos) {
            const entidad = await models.MaestroDeArticulos.findByPk(producto.id);
            const costoTotalEntidad = entidad.costo_unit * producto.quantity;
            const incremento = costoTotalEntidad * (ganancia / 100);
            const CostoFinal = costoTotalEntidad + incremento;
            subtotal += CostoFinal;
        }
    
        return subtotal;
      }
    
}
module.exports = UtilsService;