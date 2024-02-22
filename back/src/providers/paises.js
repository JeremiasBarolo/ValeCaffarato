var models = require('../models');
const uuid = require('uuid');
const listAllPaises= async () => {
  try {
    const Paises = await models.Pais.findAll(
      {
      include: { all: true },
      }
      
    );
    console.log('✅ Paises were found');
    return Paises;
  } catch (err) {
    console.error('🛑 Error when fetching Paises', err);
    throw err;
  }
};

const listOnePaises= async (Paises_id) => {
  try {
    const onePaises= await models.Pais.findByPk(Paises_id, 
      {
        include: { all: true },
        }
    );
    if (!onePaises) {
      console.error(`🛑 Paiseswith id ${Paises_id} not found`);
      return null;
    }
    return onePaises;
  } catch (err) {
    console.error('🛑 Error when fetching Paises', err);
    throw err;
  }
};

const createPaises= async (PaisesData) => {
  

  try {
    
    const dataPaises= {
      name: PaisesData.name,

    };
    

    const newPaises= await models.Pais.create(dataPaises);
    
    
    
    console.log(`✅ Paises"${newPaises.id}" was created`);
    return newPaises;
    
    
  } catch (err) {
    console.error('🛑 Error when creating Paises', err);
    throw err;
  }
};

const updatePaises= async (Paises_id, dataUpdated) => {
  

  try {

    const oldPaises= await models.Pais.findByPk(Paises_id, {
      include: { all: true },
      });
    
    let newPaises = await oldPaises.update(dataUpdated);

    return newPaises;
  } catch (err) {
    console.error('🛑 Error when updating Paises', err);
    throw err;
  }
  
};


const deletePaises = async (Paises_id) => {
  try {
    const deletedPaises = await models.Pais.findByPk(Paises_id,
      {
        include: { all: true },
        } 
    );

    if (!deletedPaises) {
      console.error(`🛑 Paises with id: ${Paises_id} not found`);
      return null;
    }
    
    await models.Pais.destroy({ where: { id: Paises_id } });

    console.log(`✅ Paises with id: ${Paises_id} was deleted successfully`);
    return deletedPaises;
  } catch (err) {
    console.error('🛑 Error when deleting Paises', err);
    throw err;
  }
};


module.exports = {
  listAllPaises, listOnePaises, createPaises, updatePaises, deletePaises,
};
