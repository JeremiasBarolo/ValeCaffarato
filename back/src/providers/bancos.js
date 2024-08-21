var models = require('../models');
const uuid = require('uuid');
const listAllBancos= async () => {
  try {
    const Bancos = await models.Bancos.findAll(
      {
        include: { all: true },
        }
    );
    console.log('✅ Bancos were found');
    return Bancos;
  } catch (err) {
    console.error('🛑 Error when fetching Bancos', err);
    throw err;
  }
};

const listOneBancos= async (Bancos_id) => {
  try {
    const oneBancos= await models.Bancos.findByPk(Bancos_id,
      {
        include: { all: true },
        } 
    );
    if (!oneBancos) {
      console.error(`🛑 Bancoswith id ${Bancos_id} not found`);
      return null;
    }
    return oneBancos;
  } catch (err) {
    console.error('🛑 Error when fetching Bancos', err);
    throw err;
  }
};

const createBancos= async (BancosData) => {
  

  try {
    
    const dataBancos= {
      name: BancosData.name,
      localidadId: parseInt(BancosData.localidad,10)
    };
    

    const newBancos= await models.Bancos.create(dataBancos);
    
    
    
    console.log(`✅ Bancos"${newBancos.id}" was created`);
    return newBancos;
    
    
  } catch (err) {
    console.error('🛑 Error when creating Bancos', err);
    throw err;
  }
};

const updateBancos= async (Bancos_id, dataUpdated) => {
  

  try {

    const oldBancos= await models.Bancos.findByPk(Bancos_id,{
      include: { all: true },
      });
    
    let newBancos = await oldBancos.update({...dataUpdated, localidadId: dataUpdated.localidad});

    return newBancos;
  } catch (err) {
    console.error('🛑 Error when updating Bancos', err);
    throw err;
  }
  
};


const deleteBancos = async (Bancos_id) => {
  try {
    const deletedBancos = await models.Bancos.findByPk(Bancos_id, 
      {
      include: { all: true },
      }
    );

    if (!deletedBancos) {
      console.error(`🛑 Bancos with id: ${Bancos_id} not found`);
      return null;
    }
    
    await models.Bancos.destroy({ where: { id: Bancos_id } });

    console.log(`✅ Bancos with id: ${Bancos_id} was deleted successfully`);
    return deletedBancos;
  } catch (err) {
    console.error('🛑 Error when deleting Bancos', err);
    throw err;
  }
};


module.exports = {
  listAllBancos, listOneBancos, createBancos, updateBancos, deleteBancos,
};
