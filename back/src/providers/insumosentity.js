var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (insumosentity_id) => {
//   try {
//     const Insumosentity= await models.InsumosEntities.findByPk(insumosentity_id,
//       { include: { all: true } });
//     return Insumosentity;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllInsumosentity= async () => {
  try {
    const InsumosEntity = await models.InsumosEntities.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ InsumosEntity were found');
    return InsumosEntity;
  } catch (err) {
    console.error('🛑 Error when fetching InsumosEntity', err);
    throw err;
  }
};

const listOneInsumosentity= async (insumosentity_id) => {
  try {
    const oneInsumosentity= await models.InsumosEntities.findByPk(insumosentity_id, {
      include: { all: true },
    });
    if (!oneInsumosentity) {
      console.error(`🛑 Insumosentitywith id ${insumosentity_id} not found`);
      return null;
    }
    return oneInsumosentity;
  } catch (err) {
    console.error('🛑 Error when fetching Insumosentity', err);
    throw err;
  }
};

const createInsumosentity= async (insumosentityData) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    
    const dataInsumosentity= {
      name: insumosentityData.name,
      quantity: insumosentityData.quantity,
      description: insumosentityData.description,
      price: insumosentityData.price,
    };

    // const imageUrls = insumosentityData.images;

    const newInsumosentity= await models.InsumosEntities.create(dataInsumosentity, { transaction });

    // const createdImages = await Promise.all(
    //   imageUrls.map((imageUrl) => models.InsumosEntitiesImages.create(
    //     {
    //       imageUrl,
    //       InsumosentityId: newInsumosentity.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Insumosentity"${newInsumosentity.name}" was created with images`);

    return newInsumosentity;
  } catch (err) {
    console.error('🛑 Error when creating Insumosentity', err);
    throw err;
  }
};

const updateInsumosentity= async (insumosentity_id, dataUpdated) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldInsumosentity= await models.InsumosEntities.findByPk(insumosentity_id, { include: { all: true } });

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldInsumosentity.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newInsumosentity= await oldInsumosentity.update(dataUpdated, { transaction });

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.InsumosEntitiesImages.create(
    //     {
    //       imageUrl,
    //       InsumosentityId: newInsumosentity.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Insumosentity"${newInsumosentity.name}" was created with images`);

    return newInsumosentity;
  } catch (err) {
    console.error('🛑 Error when updating Insumosentity', err);
    throw err;
  }
};

const deleteInsumosentity= async (insumosentity_id) => {
  try {
    const deletedInsumosentity= await models.InsumosEntities.findByPk(insumosentity_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedInsumosentity.image)

    // const images = await models.InsumosEntitiesImages.findAll({
    //   where: {
    //     InsumosentityId: insumosentity_id,
    //   },
    // });

    if (deletedInsumosentity=== 0) {
      console.error(`🛑 Insumosentitywith id: ${insumosentity_id} not found`);
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

    await models.InsumosEntities.destroy({ where: { id: insumosentity_id } });

    console.log(`✅ Insumosentitywith id: ${insumosentity_id} was deleted successfully`);
    return deletedInsumosentity;
  } catch (err) {
    console.error('🛑 Error when deleting Insumosentity', err);
    throw err;
  }
};

module.exports = {
  listAllInsumosentity, listOneInsumosentity, createInsumosentity, updateInsumosentity, deleteInsumosentity,
};
