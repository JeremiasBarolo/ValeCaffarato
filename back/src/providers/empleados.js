var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (empleado_id) => {
//   try {
//     const Empleado = await models.Empleados.findByPk(empleado_id,
//       { include: { all: true } });
//     return Empleado;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllEmpleado = async () => {
  try {
    const Empleados = await models.Empleados.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ Empleados were found');
    return Empleados;
  } catch (err) {
    console.error('🛑 Error when fetching Empleados', err);
    throw err;
  }
};

const listOneEmpleado = async (empleado_id) => {
  try {
    const oneEmpleado = await models.Empleados.findByPk(empleado_id, {
      include: { all: true },
    });
    if (!oneEmpleado) {
      console.error(`🛑 Empleado with id ${empleado_id} not found`);
      return null;
    }
    return oneEmpleado;
  } catch (err) {
    console.error('🛑 Error when fetching Empleado', err);
    throw err;
  }
};

const createEmpleado = async (empleadoData) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    const dataEmpleado = {
      name: empleadoData.name,
      lastname: empleadoData.lastname,
      adress: empleadoData.adress,
      adressNumber: empleadoData.adressNumber,
      dni: empleadoData.dni,
      city: empleadoData.city,
      phone: empleadoData.phone,
      cuit: empleadoData.cuit,
      email: empleadoData.email,
      role: empleadoData.role
    };

    // const imageUrls = empleadoData.images;

    const newEmpleado = await models.Empleados.create(dataEmpleado, { transaction });

    // const createdImages = await Promise.all(
    //   imageUrls.map((imageUrl) => models.EmpleadosImages.create(
    //     {
    //       imageUrl,
    //       EmpleadoId: newEmpleado.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Empleado "${newEmpleado.name}" was created with images`);

    return newEmpleado;
  } catch (err) {
    console.error('🛑 Error when creating Empleado', err);
    throw err;
  }
};

const updateEmpleado = async (empleado_id, dataUpdated) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldEmpleado = await models.Empleados.findByPk(empleado_id, { include: { all: true } });

    // const newDataEmpleado = {
    //   name: oldEmpleado.name,
    //   lastname: oldEmpleado.lastname,
    //   adress: oldEmpleado.adress,
    //   adressNumber: oldEmpleado.adressNumber,
    //   dni: oldEmpleado.dni,
    //   city: oldEmpleado.city,
    //   phone: oldEmpleado.phone,
    //   cuit: oldEmpleado.cuit,
    //   email: oldEmpleado.email,
    //   role: oldEmpleado.role
    // };

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldEmpleado.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newEmpleado = await oldEmpleado.update(dataUpdated, { transaction });

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.EmpleadosImages.create(
    //     {
    //       imageUrl,
    //       EmpleadoId: newEmpleado.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Empleado "${newEmpleado.name}" was created with images`);

    return newEmpleado;
  } catch (err) {
    console.error('🛑 Error when updating Empleado', err);
    throw err;
  }
};

const deleteEmpleado = async (empleado_id) => {
  try {
    const deletedEmpleado = await models.Empleados.findByPk(empleado_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedEmpleado.image)

    // const images = await models.EmpleadosImages.findAll({
    //   where: {
    //     EmpleadoId: empleado_id,
    //   },
    // });

    if (deletedEmpleado === 0) {
      console.error(`🛑 Empleado with id: ${empleado_id} not found`);
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

    await models.Empleados.destroy({ where: { id: empleado_id } });

    console.log(`✅ Empleado with id: ${empleado_id} was deleted successfully`);
    return deletedEmpleado;
  } catch (err) {
    console.error('🛑 Error when deleting Empleado', err);
    throw err;
  }
};

module.exports = {
  listAllEmpleado, listOneEmpleado, createEmpleado, updateEmpleado, deleteEmpleado,
};
