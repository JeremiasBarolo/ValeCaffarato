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

    

    if(insumoData.admin === 'yes'){

      const dataInsumo= {
        name: insumoData.name,
        description: insumoData.description,
        price: insumoData.price,
        quantity: insumoData.quantity,
        quantity_reserved: 0,

      };

      const insumoAdmin= await models.Insumos.create(dataInsumo);



      return insumoAdmin;

    }else{
      const createdInsumos = await Promise.all(insumoData.map(async (insumo) => {
        const checkInsumos = await models.Insumos.findOne({
          where: {
            antiguo_id: insumo.id
          }
        });

        if (checkInsumos) {
          const cantidadNueva = checkInsumos.quantity + insumo.PedidosInsumos.cantidad;
          const updatedProduct = await checkInsumos.update({
            quantity: cantidadNueva
          });
          return updatedProduct;
          
        } else {
          const newInsumo = await models.Insumos.create({
            quantity: insumo.PedidosInsumos.cantidad,
            name: insumo.name,
            description: insumo.description,
            price: insumo.price,
            antiguo_id: insumo.id,
            quantity_reserved: 0,
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
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldInsumo= await models.Insumos.findByPk(insumo_id, { include: { all: true } });

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldInsumo.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newInsumo= await oldInsumo.update(dataUpdated, { transaction });

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.InsumoImages.create(
    //     {
    //       imageUrl,
    //       InsumoId: newInsumo.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

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

    for (const insumo of deletedInsumo.ProductEntities) {
      
      await models.ProductEntityQuantities.destroy({ where:  
        { 
          quantity_necessary: insumo.ProductEntityQuantities.quantity_necessary, 
          productEntityId: insumo.ProductEntityQuantities.productEntityId, 
          insumoId: insumo.ProductEntityQuantities.insumoId 
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
