var models = require('../models');
const UtilsService = require('../classes/utils');
const utilsService = new UtilsService();

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

    let dataMaestroArticulos= {
      name: MaestroArticulosData.name,
      description: MaestroArticulosData.description,
      costo_unit: MaestroArticulosData.costo_unit,
      uni_medida: MaestroArticulosData.uni_medida,
      profit:MaestroArticulosData.profit,
      tipoArticulo: MaestroArticulosData.tipoArticulo,
    };

    
    if(MaestroArticulosData.tipoArticulo === "PRODUCTO"){
      let costo_unit = await utilsService.calcularCostoUnitarioEntidadProducto(MaestroArticulosData.profit, MaestroArticulosData.productos)
      dataMaestroArticulos = {...dataMaestroArticulos, costo_unit: costo_unit}
    }
    
    
    
   


    const newMaestroArticulos= await models.MaestroDeArticulos.create(dataMaestroArticulos);

    if(dataMaestroArticulos.tipoArticulo === "PRODUCTO" && MaestroArticulosData.productos.length > 0){

      await MaestroArticulosData.productos.forEach(async product => {
        await models.ProductQuantities.create({
          entidadId:  newMaestroArticulos.id,
          productoId: product.id, 
          quantity_necessary: product.quantity
        })
      });

 
    }

    


    console.log(`✅ MaestroArticulos"${newMaestroArticulos.name}" was created`);

    return newMaestroArticulos;
  } catch (err) {
    console.error('🛑 Error when creating MaestroArticulos', err);
    throw err;
  }
};

const updateMaestroArticulos= async (MaestroArticulos_id, dataUpdated) => {


  try {

    const oldMaestroArticulos= await models.MaestroDeArticulos.findByPk(MaestroArticulos_id, {include: { all: true }});

    if(oldMaestroArticulos.tipoArticulo === "PRODUCTO"){

      
        const productosExistente = await models.ProductQuantities.findAll({
            where: {
              entidadId:  MaestroArticulos_id
            }
        });
    
        const idsProductosExistente = productosExistente.map(producto => producto.productId);
    
        
        for (const entidad of dataUpdated.productos) {
           
            if (idsProductosExistente.includes(entidad.id)) {
                
                const producto = productosExistente.find(p => p.productId === entidad.id);
                await producto.update({
                    quantity_necessary: entidad.cantidad
                });
                
                const index = idsProductosExistente.indexOf(entidad.id);
                if (index > -1) {
                    idsProductosExistente.splice(index, 1);
                }
            } else {
                
                await models.ProductQuantities.create({
                    entidadId: MaestroArticulos_id,
                    productoId: entidad.id,
                    quantity_necessary: entidad.quantity
                });
            }
        }
    
        
        for (const idProductoNoPresente of idsProductosExistente) {
            const productoEliminar = productosExistente.find(p => p.productId === idProductoNoPresente);
            await productoEliminar.destroy();
        }
    
    }

    let costo_unit = await utilsService.calcularCostoUnitarioEntidadProducto(dataUpdated.profit, dataUpdated.productos)

    const newMaestroArticulos= await oldMaestroArticulos.update({...dataUpdated, costo_unit: costo_unit });

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
