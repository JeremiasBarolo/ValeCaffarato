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
    
    if(productosData.admin === 'yes'){
    const ProductosData= {
      name: productosData.name,
      description: productosData.description,
      measurement_height: productosData.measurement_height,
      measurement_length: productosData.measurement_length,
      measurement_depth: productosData.measurement_depth,
      price: productosData.price,
      profit: productosData.profit,
      quantity: productosData.quantity,
      unidad_medida: productosData.unidad_medida
    };
    
        const newProductos= await models.Productos.create(ProductosData);

        
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
                price: producto.price,
                measurement_height: producto.measurement_height,
                measurement_length: producto.measurement_length,
                measurement_depth: producto.measurement_depth,
                profit: producto.profit,
                antiguo_id: producto.id,
                unidad_medida: producto.unidad_medida
              });
              return newProduct;
            }
          }));
    
          return createdProducts;
    }
  
    

    console.log(`✅ Productos"${newProductos.name}" was created successfully`);

    return newProductos;
  } catch (err) {
    console.error('🛑 Error when creating Productos', err);
    throw err;
  }
};

const updateProductos= async (productos_id, dataUpdated) => {


  try {
    

    const oldProductos= await models.Productos.findByPk(productos_id, { include: { all: true } });


    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldProductos.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newProductos= await oldProductos.update(dataUpdated);

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.PProductosImages.create(
    //     {
    //       imageUrl,
    //       ProductosId: newProductos.id,
    //     },
    //   ,
    //   )),
    // );

    

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
    // const images = path.join(__dirname, '../public/images', deletedProductos.image)

    // const images = await models.PProductosImages.findAll({
    //   where: {
    //     ProductosId: productos_id,
    //   },
    // });

    if (deletedProductos=== 0) {
      console.error(`🛑 Productoswith id: ${productos_id} not found`);
      return null;
    }

    // if (images) {
    //   images.forEach((image) => {
    //     const deletingImages = image.imageUrl;
    //     if (fs.existsSync(deletingImages)) {
    //       fs.unlinkSync(deletingImages);
    //     } else {
    //       console.log('No existe la imagen');
    //     }
    //   });
    // }

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
