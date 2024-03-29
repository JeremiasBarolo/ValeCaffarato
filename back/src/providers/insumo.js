var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (insumo_id) => {
//   try {
//     const Insumo= await models.Insumo.findByPk(insumo_id,
//       { include: { all: true } });
//     return Insumo;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllInsumo= async () => {
  try {
    const Insumo = await models.Insumos.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ Insumo were found');
    return Insumo;
  } catch (err) {
    console.error('🛑 Error when fetching Insumo', err);
    throw err;
  }
};

const listOneInsumo= async (insumo_id) => {
  try {
    const oneInsumo= await models.Insumos.findByPk(insumo_id, {
      include: { all: true },
    });
    if (!oneInsumo) {
      console.error(`🛑 Insumowith id ${insumo_id} not found`);
      return null;
    }
    return oneInsumo;
  } catch (err) {
    console.error('🛑 Error when fetching Insumo', err);
    throw err;
  }
};

const createInsumo= async (insumoData) => {
  try {

    

    if(insumoData.admin){

      const newinsumoData= {
        id: parseInt(insumoData.id, 10),
        cantidad: parseInt(insumoData.cantidad, 10),
        depositoId: parseInt(insumoData.depositoId, 10),

      }

      const entidad = await models.MaestroDeArticulos.findByPk(newinsumoData.id)
      const existe = await models.Insumos.findOne({
      where: {
        antiguo_id: newinsumoData.id
      }
    })

    if(existe){
      const suma = existe.quantity + newinsumoData.cantidad
      await existe.update({
        quantity: suma,
        depositoId: newinsumoData.depositoId
      })
      return suma
    }else{
      const newProductos = await models.Insumos.create({
        quantity: newinsumoData.cantidad,
        name: entidad.name,
        description: entidad.description,
        price: entidad.costo_unit,
        antiguo_id: newinsumoData.id,
        quantity_reserved: 0,
        unidad_medida: entidad.uni_medida,
        depositoId: newinsumoData.depositoId
       })
            
        return newProductos
    }

    }else{
      const createdInsumos = await Promise.all(insumoData.map(async (insumo) => {
        const checkInsumos = await models.Insumos.findOne({
          where: {
            antiguo_id: insumo.id
          }
        });

        if (checkInsumos) {
          const cantidadNueva = checkInsumos.quantity + insumo.PedidosProductos.quantity_requested;
          const updatedProduct = await checkInsumos.update({
            quantity: cantidadNueva
          });
          return updatedProduct;
          
        } else {

          const newInsumo = await models.Insumos.create({
            quantity: insumo.PedidosProductos.quantity_requested,
            name: insumo.name,
            description: insumo.description,
            price: insumo.costo_unit,
            antiguo_id: insumo.id,
            quantity_reserved: 0,
            unidad_medida: insumo.uni_medida,
            depositoId: insumo.depositoId
          });
          return newInsumo;
        }
      }));

      return createdInsumos;
      
    }


    
  } catch (err) {
    console.error('🛑 Error when creating Insumo', err);
    throw err;
  }
};

const updateInsumo= async (insumo_id, dataUpdated) => {
  try {
    

    const oldInsumo= await models.Insumos.findByPk(insumo_id, { include: { all: true } });


    const newInsumo= await oldInsumo.update(dataUpdated);


    console.log(`✅ Insumo"${newInsumo.name}" was created with images`);

    return newInsumo;
  } catch (err) {
    console.error('🛑 Error when updating Insumo', err);
    throw err;
  }
};

const deleteInsumo= async (insumo_id) => {
  try {
    const deletedInsumo= await models.Insumos.findByPk(insumo_id, { include: { all: true } });
   

    if (deletedInsumo=== 0) {
      console.error(`🛑 Insumowith id: ${insumo_id} not found`);
      return null;
    }

    for (const insumo of deletedInsumo.MaestroDeArticulos) {
      
      await models.ProductQuantities.destroy({ where:  
        { 
          quantity_necessary: insumo.ProductQuantities.quantity_necessary, 
          productId: insumo.ProductQuantities.productId, 
          insumoId: insumo.ProductQuantities.insumoId 
        } });
    }

    await models.Insumos.destroy({ where: { id: insumo_id } });

    console.log(`✅ Insumowith id: ${insumo_id} was deleted successfully`);
    return deletedInsumo;
  } catch (err) {
    console.error('🛑 Error when deleting Insumo', err);
    throw err;
  }
};

module.exports = {
  listAllInsumo, listOneInsumo, createInsumo, updateInsumo, deleteInsumo,
};
