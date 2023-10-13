var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (proveedor_id) => {
//   try {
//     const Proveedor= await models.Proveedores.findByPk(proveedor_id,
//       { include: { all: true } });
//     return Proveedor;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllProveedor= async () => {
  try {
    const Proveedores = await models.Proveedores.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ Proveedores were found');
    return Proveedores;
  } catch (err) {
    console.error('🛑 Error when fetching Proveedores', err);
    throw err;
  }
};

const listOneProveedor= async (proveedor_id) => {
  try {
    const oneProveedor= await models.Proveedores.findByPk(proveedor_id, {
      include: { all: true },
    });
    if (!oneProveedor) {
      console.error(`🛑 Proveedorwith id ${proveedor_id} not found`);
      return null;
    }
    return oneProveedor;
  } catch (err) {
    console.error('🛑 Error when fetching Proveedor', err);
    throw err;
  }
};

const createProveedor= async (proveedorData) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    const dataProveedor= {
      name: proveedorData.name,
      lastname: proveedorData.lastname,
      industry: proveedorData.industry,
      dni: proveedorData.dni,
      city: proveedorData.city,
      phone: proveedorData.phone,
      cuit: proveedorData.cuit,
      email: proveedorData.email,
    };

    // const imageUrls = proveedorData.images;

    const newProveedor= await models.Proveedores.create(dataProveedor, { transaction });

    // const createdImages = await Promise.all(
    //   imageUrls.map((imageUrl) => models.ProveedoresImages.create(
    //     {
    //       imageUrl,
    //       ProveedorId: newProveedor.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Proveedor"${newProveedor.name}" was created with images`);

    return newProveedor;
  } catch (err) {
    console.error('🛑 Error when creating Proveedor', err);
    throw err;
  }
};

const updateProveedor= async (proveedor_id, dataUpdated) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldProveedor= await models.Proveedores.findByPk(proveedor_id, { include: { all: true } });

    // const newDataProveedor= {
    //   name: oldProveedor.name,
    //   lastname: oldProveedor.lastname,
    //   adress: oldProveedor.adress,
    //   adressNumber: oldProveedor.adressNumber,
    //   dni: oldProveedor.dni,
    //   city: oldProveedor.city,
    //   phone: oldProveedor.phone,
    //   cuit: oldProveedor.cuit,
    //   email: oldProveedor.email,
    //   role: oldProveedor.role
    // };

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldProveedor.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newProveedor= await oldProveedor.update(dataUpdated, { transaction });

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.ProveedoresImages.create(
    //     {
    //       imageUrl,
    //       ProveedorId: newProveedor.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Proveedor"${newProveedor.name}" was created with images`);

    return newProveedor;
  } catch (err) {
    console.error('🛑 Error when updating Proveedor', err);
    throw err;
  }
};

const deleteProveedor= async (proveedor_id) => {
  try {
    const deletedProveedor= await models.Proveedores.findByPk(proveedor_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedProveedor.image)

    // const images = await models.ProveedoresImages.findAll({
    //   where: {
    //     ProveedorId: proveedor_id,
    //   },
    // });

    if (deletedProveedor=== 0) {
      console.error(`🛑 Proveedorwith id: ${proveedor_id} not found`);
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

    await models.Proveedores.destroy({ where: { id: proveedor_id } });

    console.log(`✅ Proveedorwith id: ${proveedor_id} was deleted successfully`);
    return deletedProveedor;
  } catch (err) {
    console.error('🛑 Error when deleting Proveedor', err);
    throw err;
  }
};

module.exports = {
  listAllProveedor, listOneProveedor, createProveedor, updateProveedor, deleteProveedor,
};
