var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (CompraFinalizacion_id) => {
//   try {
//     const CompraFinalizacion= await models.CompraFinalizacion.findByPk(CompraFinalizacion_id,
//       { include: { all: true } });
//     return CompraFinalizacion;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllCompraFinalizacion= async () => {
  try {
    const CompraFinalizacion = await models.CompraFinalizacion.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ CompraFinalizacion were found');
    return CompraFinalizacion;
  } catch (err) {
    console.error('🛑 Error when fetching CompraFinalizacion', err);
    throw err;
  }
};

const listOneCompraFinalizacion= async (compraFinalizacion_id) => {
  try {
    const oneCompraFinalizacion= await models.CompraFinalizacion.findByPk(compraFinalizacion_id, {
      include: { all: true },
    });
    if (!oneCompraFinalizacion) {
      console.error(`🛑 CompraFinalizacionwith id ${compraFinalizacion_id} not found`);
      return null;
    }
    return oneCompraFinalizacion;
  } catch (err) {
    console.error('🛑 Error when fetching CompraFinalizacion', err);
    throw err;
  }
};

const createCompraFinalizacion= async (compraFinalizacionData) => {
 

  try {
    
    
    const dataCompraFinalizacion= {
        id: compraFinalizacionData.id,
        name: compraFinalizacionData.name,
        description: compraFinalizacionData.description,
        subtotal: compraFinalizacionData.subtotal,
    };

    // const imageUrls = CompraFinalizacionData.images;

    const newCompraFinalizacion= await models.CompraFinalizacion.create(dataCompraFinalizacion, );
    await models.CompraPreparacion.destroy({ where: { id: compraFinalizacionData.id } })

    .then(
      () => {
        compraFinalizacionData.InsumoEnProcesos.forEach(async insumoEntity => {
          const insumoCreado = await models.InsumoEnProceso.findByPk(insumoEntity.id);
    
          await newCompraFinalizacion.addInsumoEnProceso(insumoCreado);
        })
      }
    )
    

    console.log(`✅ CompraFinalizacion"${newCompraFinalizacion.name}" was created with images`);

    return newCompraFinalizacion;
  } catch (err) {
    console.error('🛑 Error when creating CompraFinalizacion', err);
    throw err;
  }
};

const updateCompraFinalizacion= async (compraFinalizacion_id, dataUpdated) => {
  let transaction;

  try {
    

    const oldCompraFinalizacion= await models.CompraFinalizacion.findByPk(compraFinalizacion_id, { include: { all: true } });

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldCompraFinalizacion.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newCompraFinalizacion= await oldCompraFinalizacion.update(dataUpdated, );

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.CompraFinalizacionImages.create(
    //     {
    //       imageUrl,
    //       CompraFinalizacionId: newCompraFinalizacion.id,
    //     },
    //     ,
    //   )),
    // );

    // Confirma la transacción
    

    console.log(`✅ CompraFinalizacion"${newCompraFinalizacion.name}" was created with images`);

    return newCompraFinalizacion;
  } catch (err) {
    console.error('🛑 Error when updating CompraFinalizacion', err);
    throw err;
  }
};

const deleteCompraFinalizacion= async (compraFinalizacion_id) => {
  try {
    const deletedCompraFinalizacion= await models.CompraFinalizacion.findByPk(compraFinalizacion_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedCompraFinalizacion.image)

    // const images = await models.CompraFinalizacionImages.findAll({
    //   where: {
    //     CompraFinalizacionId: CompraFinalizacion_id,
    //   },
    // });

    if (deletedCompraFinalizacion=== 0) {
      console.error(`🛑 CompraFinalizacionwith id: ${compraFinalizacion_id} not found`);
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

    await models.CompraFinalizacion.destroy({ where: { id: compraFinalizacion_id } });

    console.log(`✅ CompraFinalizacionwith id: ${compraFinalizacion_id} was deleted successfully`);
    return deletedCompraFinalizacion;
  } catch (err) {
    console.error('🛑 Error when deleting CompraFinalizacion', err);
    throw err;
  }
};

module.exports = {
  listAllCompraFinalizacion, listOneCompraFinalizacion, createCompraFinalizacion, updateCompraFinalizacion, deleteCompraFinalizacion,
};
