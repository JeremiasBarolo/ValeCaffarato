var models = require('../models');
const uuid = require('uuid');
const listAllLocalidades= async () => {
  try {
    const Localidades = await models.Localidad.findAll(
      {
      include: { all: true },
      }
    );
    console.log('✅ Localidades were found');
    return Localidades;
  } catch (err) {
    console.error('🛑 Error when fetching Localidades', err);
    throw err;
  }
};

const listOneLocalidades= async (Localidades_id) => {
  try {
    const oneLocalidades= await models.Localidad.findByPk(Localidades_id, 
      {
        include: { all: true },
        }
    );
    if (!oneLocalidades) {
      console.error(`🛑 Localidadeswith id ${Localidades_id} not found`);
      return null;
    }
    return oneLocalidades;
  } catch (err) {
    console.error('🛑 Error when fetching Localidades', err);
    throw err;
  }
};

const createLocalidades= async (LocalidadesData) => {
  

  try {
    
    const dataLocalidades= {
      name: LocalidadesData.name,
      codigo_postal:LocalidadesData.codigo_postal,
      provinciaId: LocalidadesData.provinciaId

    };
    

    const newLocalidades= await models.Localidad.create(dataLocalidades);
    
    
    
    console.log(`✅ Localidades"${newLocalidades.id}" was created`);
    return newLocalidades;
    
    
  } catch (err) {
    console.error('🛑 Error when creating Localidades', err);
    throw err;
  }
};

const updateLocalidades= async (Localidades_id, dataUpdated) => {
  

  try {

    const oldLocalidades= await models.Localidad.findByPk(Localidades_id,
      {
        include: { all: true },
        });
    
    let newLocalidades = await oldLocalidades.update(dataUpdated);

    return newLocalidades;
  } catch (err) {
    console.error('🛑 Error when updating Localidades', err);
    throw err;
  }
  
};


const deleteLocalidades = async (Localidades_id) => {
  try {
    const deletedLocalidades = await models.Localidad.findByPk(Localidades_id, 
      {
        include: { all: true },
        }
    );

    if (!deletedLocalidades) {
      console.error(`🛑 Localidades with id: ${Localidades_id} not found`);
      return null;
    }
    
    await models.Localidad.destroy({ where: { id: Localidades_id } });

    console.log(`✅ Localidades with id: ${Localidades_id} was deleted successfully`);
    return deletedLocalidades;
  } catch (err) {
    console.error('🛑 Error when deleting Localidades', err);
    throw err;
  }
};


module.exports = {
  listAllLocalidades, listOneLocalidades, createLocalidades, updateLocalidades, deleteLocalidades,
};
