const { where } = require('sequelize');
var models = require('../models');
const uuid = require('uuid');
const listAllProvincias= async () => {
  try {
    const Provincias = await models.Provincia.findAll(
      {
        include: { all: true },
        }
    );
    console.log('✅ Provincias were found');
    return Provincias;
  } catch (err) {
    console.error('🛑 Error when fetching Provincias', err);
    throw err;
  }
};

const listOneProvincias= async (Provincias_id) => {
  try {
    const oneProvincias= await models.Provincia.findByPk(Provincias_id, 
      {
        include: { all: true },
        }
    );
    if (!oneProvincias) {
      console.error(`🛑 Provinciaswith id ${Provincias_id} not found`);
      return null;
    }
    return oneProvincias;
  } catch (err) {
    console.error('🛑 Error when fetching Provincias', err);
    throw err;
  }
};

const createProvincias = async (ProvinciasData) => {
    try {
      const dataProvincias = {
        name: ProvinciasData.name,
        paisId: parseInt(ProvinciasData.paisId,10),
      };
      

      
      if (!dataProvincias.paisId) {
        throw new Error('Seleccione un Pais');
      }

      const existe = await models.Provincia.findOne({
        where:{ name: ProvinciasData.name}
      })
      if(existe){
        throw new Error ('Ya existe una Provincia con ese nombre.')
      }else{
        return await models.Provincia.create(dataProvincias);
      }
  
      
  
      console.log(`✅ Provincia "${newProvincias.id}" was created`);
      
    } catch (err) {
      console.error('🛑 Error when creating Provincia', err);
      throw err;
    }
  };

const updateProvincias= async (Provincias_id, dataUpdated) => {
  

  try {

    const oldProvincias= await models.Provincia.findByPk(Provincias_id,{
      include: { all: true },
      });
    
    let newProvincias = await oldProvincias.update(dataUpdated);

    return newProvincias;
  } catch (err) {
    console.error('🛑 Error when updating Provincias', err);
    throw err;
  }
  
};


const deleteProvincias = async (Provincias_id) => {
  try {
    const deletedProvincias = await models.Provincia.findByPk(Provincias_id, 
      {
        include: { all: true },
        }
    );

    if (!deletedProvincias) {
      console.error(`🛑 Provincias with id: ${Provincias_id} not found`);
      return null;
    }
    
    await models.Provincia.destroy({ where: { id: Provincias_id } });

    console.log(`✅ Provincias with id: ${Provincias_id} was deleted successfully`);
    return deletedProvincias;
  } catch (err) {
    console.error('🛑 Error when deleting Provincias', err);
    throw err;
  }
};


module.exports = {
  listAllProvincias, listOneProvincias, createProvincias, updateProvincias, deleteProvincias,
};
