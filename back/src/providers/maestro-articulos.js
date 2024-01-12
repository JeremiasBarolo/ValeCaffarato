var models = require('../models');
const path = require('path');
const fs = require('fs');

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
          entidadId: newMaestroArticulos.id , 
          productoId: product.id,  
          quantity_necessary: product.quantity
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

    const newMaestroArticulos= await oldMaestroArticulos.update(dataUpdated);

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
    
    if (!deletedMaestroArticulos) {
      console.error(`🛑 MaestroArticuloswith id: ${MaestroArticulos_id} not found`);
      return null;
    }

    for (const insumo of deletedMaestroArticulos.ProductosEnStocks) {
      
      await models.ProductQuantities.destroy({ where:  
        { 
          quantity_necessary: insumo.ProductQuantities.quantity_necessary, 
          productoId: insumo.ProductQuantities.productoId, 
          entidadId: insumo.ProductQuantities.entidadId 
        } });
    }

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
