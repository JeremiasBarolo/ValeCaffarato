var models = require('../models');

const listAllCliente = async () => {
  try {
    const Clientes = await models.Clientes.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ Clientes were found');
    return Clientes;
  } catch (err) {
    console.error('🛑 Error when fetching Clientes', err);
    throw err;
  }
};

const listOneCliente = async (cliente_id) => {
  try {
    const oneCliente = await models.Clientes.findByPk(cliente_id, {
      include: { all: true },
    });
    if (!oneCliente) {
      console.error(`🛑 Cliente with id ${cliente_id} not found`);
      return null;
    }
    return oneCliente;
  } catch (err) {
    console.error('🛑 Error when fetching Cliente', err);
    throw err;
  }
};

const createCliente = async (clienteData) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    const dataCliente = {
      name: clienteData.name,
      lastname: clienteData.lastname,
      industry: clienteData.industry,
      dni: clienteData.dni,
      city: clienteData.city,
      phone: clienteData.phone,
      cuit: clienteData.cuit,
      email: clienteData.email,
    };

    // const imageUrls = clienteData.images;

    const newCliente = await models.Clientes.create(dataCliente, { transaction });

    // const createdImages = await Promise.all(
    //   imageUrls.map((imageUrl) => models.ClientesImages.create(
    //     {
    //       imageUrl,
    //       ClienteId: newCliente.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Cliente "${newCliente.name}" was created with images`);

    return newCliente;
  } catch (err) {
    console.error('🛑 Error when creating Cliente', err);
    throw err;
  }
};

const updateCliente = async (cliente_id, dataUpdated) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();

    const oldCliente = await models.Clientes.findByPk(cliente_id, { include: { all: true } });

    // const newDataCliente = {
    //   name: oldCliente.name,
    //   lastname: oldCliente.lastname,
    //   adress: oldCliente.adress,
    //   adressNumber: oldCliente.adressNumber,
    //   dni: oldCliente.dni,
    //   city: oldCliente.city,
    //   phone: oldCliente.phone,
    //   cuit: oldCliente.cuit,
    //   email: oldCliente.email,
    //   role: oldCliente.role
    // };

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldCliente.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newCliente = await oldCliente.update(dataUpdated, { transaction });

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.ClientesImages.create(
    //     {
    //       imageUrl,
    //       ClienteId: newCliente.id,
    //     },
    //     { transaction },
    //   )),
    // );

    // Confirma la transacción
    await transaction.commit();

    console.log(`✅ Cliente "${newCliente.name}" was created with images`);

    return newCliente;
  } catch (err) {
    console.error('🛑 Error when updating Cliente', err);
    throw err;
  }
};

const deleteCliente = async (cliente_id) => {
  try {
    const deletedCliente = await models.Clientes.findByPk(cliente_id, { include: { all: true } });
    // const images = path.join(__dirname, '../public/images', deletedCliente.image)

    // const images = await models.ClientesImages.findAll({
    //   where: {
    //     ClienteId: cliente_id,
    //   },
    // });

    if (deletedCliente === 0) {
      console.error(`🛑 Cliente with id: ${cliente_id} not found`);
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

    await models.Clientes.destroy({ where: { id: cliente_id } });

    console.log(`✅ Cliente with id: ${cliente_id} was deleted successfully`);
    return deletedCliente;
  } catch (err) {
    console.error('🛑 Error when deleting Cliente', err);
    throw err;
  }
};

module.exports = {
  listAllCliente, listOneCliente, createCliente, updateCliente, deleteCliente,
};
