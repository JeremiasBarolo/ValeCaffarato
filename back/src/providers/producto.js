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

const createProductos= async (productosData) => {


  try {
    
    if(productosData.admin){
    
    const entidad = await models.ProductEntity.findByPk(productosData.id)
    const existe = await models.Productos.findOne({
      where: {
        antiguo_id: productosData.id
      }
    })

    if(existe){
      const suma = existe.quantity + parseInt(productosData.cantidad, 10)
      await existe.update({
        quantity: suma
      })
    }else{
      const newProductos = await models.Productos.create({
        quantity: productosData.cantidad,
        name: entidad.name,
        description: entidad.description,
        costo_unit: entidad.price,
        unidad_medida: entidad.unidad_medida,
        profit: entidad.profit,
        antiguo_id: productosData.id,
       })
            
        return newProductos
    }
    
        
    }else{



        const createdProducts = await Promise.all(productosData.map(async (producto) => {
            const checkProduct = await models.Productos.findOne({
              where: {
                antiguo_id: producto.id
              }
            });
    
            if (checkProduct) {
              const cantidadNueva = checkProduct.quantity + producto.PedidosProductos.quantity_requested;
              const updatedProduct = await checkProduct.update({
                quantity: cantidadNueva
              });
              return updatedProduct;
            } else {
              const newProduct = await models.Productos.create({
                quantity: producto.PedidosProductos.quantity_requested,
                name: producto.name,
                description: producto.description,
                costo_unit: producto.costo_unit,
                profit: producto.profit,
                antiguo_id: producto.id,
                unidad_medida: producto.uni_medida,

                
              });
              return newProduct;
            }
          }));
    
          return createdProducts;
    }
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
  listAllProductos, listOneProductos, createProductos, updateProductos, deleteProductos,
};
