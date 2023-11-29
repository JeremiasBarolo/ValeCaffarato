var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (productentity_id) => {
//   try {
//     const Productentity= await models.PProductEntity.findByPk(productentity_id,
//       { include: { all: true } });
//     return Productentity;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllProductentity= async () => {
  try {
    const ProductEntity = await models.ProductEntity.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ PProductEntity were found');
    return ProductEntity;
  } catch (err) {
    console.error('🛑 Error when fetching PProductEntity', err);
    throw err;
  }
};

const listOneProductentity= async (productentity_id) => {
  try {
    const oneProductentity= await models.ProductEntity.findByPk(productentity_id, {
      include: { all: true },
    });
    if (!oneProductentity) {
      console.error(`🛑 Productentitywith id ${productentity_id} not found`);
      return null;
    }
    return oneProductentity;
  } catch (err) {
    console.error('🛑 Error when fetching Productentity', err);
    throw err;
  }
};

const createProductentity= async (productentityData) => {


  try {
    
    const ProductentityData= {
      name: productentityData.name,
      description: productentityData.description,
      measurement_height: productentityData.measurement_height,
      measurement_length: productentityData.measurement_length,
      measurement_depth: productentityData.measurement_depth,
      price: productentityData.price,
      profit: productentityData.profit,
      unidad_medida: productentityData.unidad_medida
    };
    const insumosData = productentityData.insumos.map(item => ({
      insumoId: item.id,
      quantity: item.quantity
    }));

  const newProductEntity= await models.ProductEntity.create(ProductentityData);

  for (const insumo of insumosData) {
      const insumoEntity = await models.Insumos.findByPk(insumo.insumoId);
      if (insumoEntity) {
        await models.ProductEntityQuantities.create({
          productEntityId: newProductEntity.id,
          insumoId: insumo.insumoId,
          quantity_necessary: insumo.quantity
        });
      }
  }

  

    

    console.log(`✅ Productentity"${newProductEntity.name}" was created with images`);

    return newProductEntity;
  } catch (err) {
    console.error('🛑 Error when creating Productentity', err);
    throw err;
  }
};

const updateProductentity= async (productentity_id, dataUpdated) => {


  try {
    

    const oldProductEntity= await models.ProductEntity.findByPk(productentity_id, { include: { all: true } });


    const newProductentity= await oldProductEntity.update(dataUpdated);



    console.log(`✅ Productentity"${newProductentity.name}" was created with images`);

    return newProductentity;
  } catch (err) {
    console.error('🛑 Error when updating Productentity', err);
    throw err;
  }
};

const deleteProductentity= async (productentity_id) => {
  try {
    const deletedProductentity= await models.ProductEntity.findByPk(productentity_id, {
      include: { all: true },
    });
    
    if (deletedProductentity=== 0) {
      console.error(`🛑 Productentity with id: ${productentity_id} not found`);
      return null;
    }

    for (const product of deletedProductentity.Pedidos) {
      
      await models.PedidosProductos.destroy({ where:  
        { 
          quantity_requested: product.PedidosProductos.quantity_requested, 
          productEntityId: product.PedidosProductos.productEntityId, 
          pedidoId: product.PedidosProductos.pedidoId 
        } });
    }

    for (const insumos of deletedProductentity.Insumos) {
      
      await models.ProductEntityQuantities.destroy({ where:  
        { 
          insumoId: insumos.id,
          productEntityId: productentity_id
        } });
    }

    await models.ProductEntity.destroy({ where: { id: productentity_id } });

    
    return console.log(`✅ Insumosentitywith id: ${productentity_id} was deleted successfully`)
  } catch (err) {
    console.error('🛑 Error when deleting Insumosentity', err);
    throw err;
  }
};

module.exports = {
  listAllProductentity, listOneProductentity, createProductentity, updateProductentity, deleteProductentity,
};
