var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (productos_id) => {
//   try {
//     const Productos= await models.PProductos.findByPk(productos_id,
//       { include: { all: true } });
//     return Productos;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllProductos= async () => {
  try {
    const Productos = await models.Productos.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ PProductos were found');
    return Productos;
  } catch (err) {
    console.error('🛑 Error when fetching PProductos', err);
    throw err;
  }
};

const listOneProductos= async (productos_id) => {
  try {
    const oneProductos= await models.Productos.findByPk(productos_id, {
      include: { all: true },
    });
    if (!oneProductos) {
      console.error(`🛑 Productoswith id ${productos_id} not found`);
      return null;
    }
    return oneProductos;
  } catch (err) {
    console.error('🛑 Error when fetching Productos', err);
    throw err;
  }
};

const createProductosADMIN= async (productosData) => {


  try {
    // Si se crea usando el agregar producto desde admin...
    const entidad = await models.MaestroDeArticulos.findByPk(productosData.id)
    const existe = await models.Productos.findOne({
      where: {
        antiguo_id: parseInt(productosData.id, 10)
      }
    })

    if(existe){
      // Si existe..
      const suma = existe.quantity + parseInt(productosData.quantity, 10)
      const newProductos = await existe.update({
        quantity: suma,
        depositoId: parseInt(productosData.depositoId, 10),

      })
      return newProductos
    }else{
      // Si no existe ...
      const newProductos = await models.Productos.create({
        quantity: productosData.quantity,
        name: entidad.name,
        description: entidad.description,
        costo_unit: entidad.costo_unit,
        quantity_reserved: 0,
        unidad_medida: entidad.uni_medida,
        profit: entidad.profit,
        antiguo_id: productosData.id,
        type: productosData.type,
        depositoId: parseInt(productosData.depositoId, 10),
       })
       return newProductos
        
    }
    
      



  } catch (err) {
    console.error('🛑 Error when creating Productos', err);
    throw err;
  }
};



// Si se crea usando el sistema de pedidos
const createProductos= async (productosData) => {


  try {
    const createdProducts = await Promise.all(productosData.map(async (producto) => {
      const checkProduct = await models.Productos.findOne({
        where: {
          antiguo_id: producto.id
        }
      });
      
      // Si exite..
      if (checkProduct) {
        const cantidadNueva = checkProduct.quantity + producto.PedidosProductos.quantity_requested;
        const updatedProduct = await checkProduct.update({
          quantity: cantidadNueva
        });
        return updatedProduct;
      } else {
        // Si no existe...
        const newProduct = await models.Productos.create({
          quantity: producto.PedidosProductos.quantity_requested,
          name: producto.name,
          description: producto.description,
          costo_unit: producto.costo_unit,
          profit: producto.profit,
          antiguo_id: producto.id,
          unidad_medida: producto.uni_medida,
          type:producto.type,
        });
        return newProduct;
      }
    }));
    
    return createdProducts;

  } catch (err) {
    console.error('🛑 Error when creating Productos', err);
    throw err;
  }
};



const updateProductos= async (productos_id, dataUpdated) => {


  try {

    const oldProductos= await models.Productos.findByPk(productos_id, { include: { all: true } });


    const newProductos= await oldProductos.update({...dataUpdated, quantity:dataUpdated.cantidad });
    

    console.log(`✅ Productos"${newProductos.name}" was created with images`);

    return newProductos;
  } catch (err) {
    console.error('🛑 Error when updating Productos', err);
    throw err;
  }
};

const deleteProductos= async (productos_id) => {
  try {
    const deletedProductos= await models.Productos.findByPk(productos_id, { include: { all: true } });

    if (deletedProductos=== 0) {
      console.error(`🛑 Productoswith id: ${productos_id} not found`);
      return null;
    }


    await models.Productos.destroy({ where: { id: productos_id } });

    console.log(`✅ Productoswith id: ${productos_id} was deleted successfully`);
    return deletedProductos;
  } catch (err) {
    console.error('🛑 Error when deleting Productos', err);
    throw err;
  }
};

module.exports = {
  listAllProductos, listOneProductos, createProductos, updateProductos, deleteProductos, createProductosADMIN,
};
