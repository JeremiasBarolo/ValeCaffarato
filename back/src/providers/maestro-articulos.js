var models = require('../models');
const path = require('path');
const fs = require('fs');
// const { sequelize } = require('../db/connection')

// const serveImage = async (MaestroArticulos_id) => {
//   try {
//     const MaestroArticulos= await models.MaestroArticulos.findByPk(MaestroArticulos_id,
//       { include: { all: true } });
//     return MaestroArticulos;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllMaestroArticulos= async () => {
  try {
    const MaestroArticulos = await models.MaestroDeArticulos.findAll(
      {
        include: { all: true },
      },
    );
    console.log('✅ MaestroArticulos were found');
    return MaestroArticulos;
  } catch (err) {
    console.error('🛑 Error when fetching MaestroArticulos', err);
    throw err;
  }
};

const listOneMaestroArticulos= async (MaestroArticulos_id) => {
  try {
    const oneMaestroArticulos= await models.MaestroDeArticulos.findByPk(MaestroArticulos_id, {
      include: { all: true },
    });
    if (!oneMaestroArticulos) {
      console.error(`🛑 MaestroArticuloswith id ${MaestroArticulos_id} not found`);
      return null;
    }
    return oneMaestroArticulos;
  } catch (err) {
    console.error('🛑 Error when fetching MaestroArticulos', err);
    throw err;
  }
};

const createMaestroArticulos= async (MaestroArticulosData) => {


  try {
    
    
    const dataMaestroArticulos= {
      name: MaestroArticulosData.name,
      description: MaestroArticulosData.description,
      costo_unit: MaestroArticulosData.costo_unit,
      uni_medida: MaestroArticulosData.uni_medida,
      profit: MaestroArticulosData.profit,
      tipoArticulo: MaestroArticulosData.tipoArticulo,
    };


    const newMaestroArticulos= await models.MaestroDeArticulos.create(dataMaestroArticulos);

    if(dataMaestroArticulos.tipoArticulo === "PRODUCTO" && MaestroArticulosData.productos.length > 0){

      await MaestroArticulosData.productos.forEach(async product => {
        await models.ProductQuantities.create({
          insumoId: product.id,
          productId: newMaestroArticulos.id,
          quantity_necessary: product.quantity_necessary
        })
      });


    }

    


    console.log(`✅ MaestroArticulos"${newMaestroArticulos.name}" was created with images`);

    return newMaestroArticulos;
  } catch (err) {
    console.error('🛑 Error when creating MaestroArticulos', err);
    throw err;
  }
};

const updateMaestroArticulos= async (MaestroArticulos_id, dataUpdated) => {


  try {
    

    const oldMaestroArticulos= await models.MaestroDeArticulos.findByPk(MaestroArticulos_id, {include: { all: true }});

    // const newImageUrls = dataUpdated.images;
    // const oldImageUrls = oldMaestroArticulos.images;

    // for (let i = 0; i < oldImageUrls.length; i++) {
    //   const deletingImages = path.join(oldImageUrls[i].imageUrl);
    //   if (fs.existsSync(deletingImages)) {
    //     fs.unlinkSync(deletingImages);
    //   } else {
    //     console.log('No existe la imagen');
    //   }
    // }

    const newMaestroArticulos= await oldMaestroArticulos.update(dataUpdated);

    // const createdImages = await Promise.all(
    //   newImageUrls.map((imageUrl) => models.MaestroArticulosImages.create(
    //     {
    //       imageUrl,
    //       MaestroArticulosId: newMaestroArticulos.id,
    //     },
    //   ,
    //   )),
    // );


    console.log(`✅ MaestroArticulos"${newMaestroArticulos.name}" was created with images`);

    return newMaestroArticulos;
  } catch (err) {
    console.error('🛑 Error when updating MaestroArticulos', err);
    throw err;
  }
};

const deleteMaestroArticulos= async (MaestroArticulos_id) => {
  try {
    const deletedMaestroArticulos= await models.MaestroDeArticulos.findByPk(MaestroArticulos_id, {
      include: { all: true },
    });
    
    if (deletedMaestroArticulos=== 0) {
      console.error(`🛑 MaestroArticuloswith id: ${MaestroArticulos_id} not found`);
      return null;
    }

    // for (const insumo of deletedMaestroArticulos.Pedidos) {
      
    //   await models.PedidosInsumos.destroy({ where:  
    //     { 
    //       cantidad: insumo.PedidosInsumos.cantidad, 
    //       insumoEntityId: insumo.PedidosInsumos.insumoEntityId, 
    //       pedidoId: insumo.PedidosInsumos.pedidoId 
    //     } });
    // }

    await models.MaestroDeArticulos.destroy({ where: { id: MaestroArticulos_id } });

    console.log(`✅ MaestroArticuloswith id: ${MaestroArticulos_id} was deleted successfully`);
    return deletedMaestroArticulos;
  } catch (err) {
    console.error('🛑 Error when deleting MaestroArticulos', err);
    throw err;
  }
};

module.exports = {
  listAllMaestroArticulos, listOneMaestroArticulos, createMaestroArticulos, updateMaestroArticulos, deleteMaestroArticulos,
};
