var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (CompraPresupuesto_id) => {
//   try {
//     const CompraPresupuesto= await models.CompraPresupuesto.findByPk(CompraPresupuesto_id,
//       { include: { all: true } });
//     return CompraPresupuesto;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllCompraPresupuesto= async () => {
  try {
    const CompraPresupuesto = await models.CompraPresupuesto.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ CompraPresupuesto were found');
    return CompraPresupuesto;
  } catch (err) {
    console.error('🛑 Error when fetching CompraPresupuesto', err);
    throw err;
  }
};

const listOneCompraPresupuesto= async (compraPresupuesto_id) => {
  try {
    const oneCompraPresupuesto= await models.CompraPresupuesto.findByPk(compraPresupuesto_id, {
      include: { all: true },
    });
    if (!oneCompraPresupuesto) {
      console.error(`🛑 CompraPresupuestowith id ${compraPresupuesto_id} not found`);
      return null;
    }
    return oneCompraPresupuesto;
  } catch (err) {
    console.error('🛑 Error when fetching CompraPresupuesto', err);
    throw err;
  }
};

const createCompraPresupuesto= async (compraPresupuestoData) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    
    const dataCompraPresupuesto= {
      name: compraPresupuestoData.name,
      description: compraPresupuestoData.description,
      subtotal: compraPresupuestoData.subtotal,
    };

    // const imageUrls = CompraPresupuestoData.images;

    const newCompraPresupuesto= await models.CompraPresupuesto.create(dataCompraPresupuesto, { transaction });

    // const createdImages = await Promise.all(
    //   imageUrls.map((imageUrl) => models.CompraPresupuestoImages.create(
    //     {
    //       imageUrl,
    //       CompraPresupuestoId: newCompraPresupuesto.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ CompraPresupuesto"${newCompraPresupuesto.name}" was created with images`);

    return newCompraPresupuesto;
  } catch (err) {
    console.error('🛑 Error when creating CompraPresupuesto', err);
    throw err;
  }
};

const updateCompraPresupuesto= async (compraPresupuesto_id, dataUpdated) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldCompraPresupuesto= await models.CompraPresupuesto.findByPk(compraPresupuesto_id, { include: { all: true } });

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldCompraPresupuesto.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newCompraPresupuesto= await oldCompraPresupuesto.update(dataUpdated, { transaction });

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.CompraPresupuestoImages.create(
    //     {
    //       imageUrl,
    //       CompraPresupuestoId: newCompraPresupuesto.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ CompraPresupuesto"${newCompraPresupuesto.name}" was created with images`);

    return newCompraPresupuesto;
  } catch (err) {
    console.error('🛑 Error when updating CompraPresupuesto', err);
    throw err;
  }
};

const deleteCompraPresupuesto= async (compraPresupuesto_id) => {
  try {
    const deletedCompraPresupuesto= await models.CompraPresupuesto.findByPk(compraPresupuesto_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedCompraPresupuesto.image)

    // const images = await models.CompraPresupuestoImages.findAll({
    //   where: {
    //     CompraPresupuestoId: CompraPresupuesto_id,
    //   },
    // });

    if (deletedCompraPresupuesto=== 0) {
      console.error(`🛑 CompraPresupuestowith id: ${compraPresupuesto_id} not found`);
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

    await models.CompraPresupuesto.destroy({ where: { id: compraPresupuesto_id } });

    console.log(`✅ CompraPresupuestowith id: ${compraPresupuesto_id} was deleted successfully`);
    return deletedCompraPresupuesto;
  } catch (err) {
    console.error('🛑 Error when deleting CompraPresupuesto', err);
    throw err;
  }
};

module.exports = {
  listAllCompraPresupuesto, listOneCompraPresupuesto, createCompraPresupuesto, updateCompraPresupuesto, deleteCompraPresupuesto,
};
