var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (CompraPreparacion_id) => {
//   try {
//     const CompraPreparacion= await models.CompraPreparacion.findByPk(CompraPreparacion_id,
//       { include: { all: true } });
//     return CompraPreparacion;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllCompraPreparacion= async () => {
  try {
    const CompraPreparacion = await models.CompraPreparacion.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ CompraPreparacion were found');
    return CompraPreparacion;
  } catch (err) {
    console.error('🛑 Error when fetching CompraPreparacion', err);
    throw err;
  }
};

const listOneCompraPreparacion= async (compraPreparacion_id) => {
  try {
    const oneCompraPreparacion= await models.CompraPreparacion.findByPk(compraPreparacion_id, {
      include: { all: true },
    });
    if (!oneCompraPreparacion) {
      console.error(`🛑 CompraPreparacionwith id ${compraPreparacion_id} not found`);
      return null;
    }
    return oneCompraPreparacion;
  } catch (err) {
    console.error('🛑 Error when fetching CompraPreparacion', err);
    throw err;
  }
};

const createCompraPreparacion= async (compraPreparacionData) => {
  try {
    const data= {
        id: compraPreparacionData.id,
        name: compraPreparacionData.name,
        description: compraPreparacionData.description,
        subtotal: compraPreparacionData.subtotal,
    };


    const newCompraPreparacion= await models.CompraPreparacion.create(data);
    await models.CompraPresupuesto.destroy({ where: { id: data.id } })
    .then(
      () => {
        compraPreparacionData.InsumosEntities.forEach(async insumoEntity => {
          const insumoCreado = await models.InsumoEnProceso.create({
            name: insumoEntity.name,
            description: insumoEntity.description,
            quantity: insumoEntity.quantity,
            price: insumoEntity.price
          })
    
          await newCompraPreparacion.addInsumoEnProceso(insumoCreado);
        })
      }
    )

     

    console.log(`✅ CompraPreparacion"${newCompraPreparacion.name}" was created with images`);

    return newCompraPreparacion;
  } catch (err) {
    console.error('🛑 Error when creating CompraPreparacion', err);
    throw err;
  }
};

const updateCompraPreparacion= async (compraPreparacion_id, dataUpdated) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldCompraPreparacion= await models.CompraPreparacion.findByPk(compraPreparacion_id, { include: { all: true } });

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldCompraPreparacion.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newCompraPreparacion= await oldCompraPreparacion.update(dataUpdated);

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.CompraPreparacionImages.create(
    //     {
    //       imageUrl,
    //       CompraPreparacionId: newCompraPreparacion.id,
    //     },
    //   ,
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ CompraPreparacion"${newCompraPreparacion.name}" was created with images`);

    return newCompraPreparacion;
  } catch (err) {
    console.error('🛑 Error when updating CompraPreparacion', err);
    throw err;
  }
};

const deleteCompraPreparacion= async (compraPreparacion_id) => {
  try {
    const deletedCompraPreparacion= await models.CompraPreparacion.findByPk(compraPreparacion_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedCompraPreparacion.image)

    // const images = await models.CompraPreparacionImages.findAll({
    //   where: {
    //     CompraPreparacionId: CompraPreparacion_id,
    //   },
    // });

    if (deletedCompraPreparacion=== 0) {
      console.error(`🛑 CompraPreparacionwith id: ${compraPreparacion_id} not found`);
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

    await models.CompraPreparacion.destroy({ where: { id: compraPreparacion_id } });

    console.log(`✅ CompraPreparacionwith id: ${compraPreparacion_id} was deleted successfully`);
    return deletedCompraPreparacion;
  } catch (err) {
    console.error('🛑 Error when deleting CompraPreparacion', err);
    throw err;
  }
};

module.exports = {
  listAllCompraPreparacion, listOneCompraPreparacion, createCompraPreparacion, updateCompraPreparacion, deleteCompraPreparacion,
};
