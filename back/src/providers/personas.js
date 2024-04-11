var models = require('../models');
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');
// const { sequelize } = require('../db/connection')

// const serveImage = async (Personas_id) => {
//   try {
//     const Personas = await models.Personas.findByPk(Personas_id,
//       { include: { all: true } });
//     return Personas;
//   } catch (err) {
//     console.error('🛑 Error when fetching product', err);
//     throw err;
//   }
// };

const listAllPersonas = async () => {
  try {
    const personas = await models.Personas.findAll({
      include: { all: true },
    });

    console.log('✅ Personas were found');
    return personas;
  } catch (err) {
    console.error('🛑 Error when fetching Personas', err);
    throw err;
  }
};

const listOnePersonas = async (Personas_id) => {
  try {
    const onePersonas = await models.Personas.findByPk(Personas_id,
      {
        include: { all: true }
      }
      );
    if (!onePersonas) {
      console.error(`🛑 Personas with id ${Personas_id} not found`);
      return null;
    }
    return onePersonas;
  } catch (err) {
    console.error('🛑 Error when fetching Personas', err);
    throw err;
  }
};

const createPersonas = async (dataUpdated) => {
  
  try {
    
    const dataCreate = {
      name: dataUpdated.name,
      lastname: dataUpdated.lastname,
      adress: dataUpdated.address,
      adress_number: dataUpdated.adress_number,
      dni: dataUpdated.dni,
      phone: dataUpdated.phone,
      cuil: dataUpdated.cuil,
      email: dataUpdated.email,
      CondIvaId:parseInt(dataUpdated.cond_iva,10),
      TipoPersonaId:parseInt(dataUpdated.tipo_persona,10),
      localidadId: parseInt(dataUpdated.localidadId,10),
    };

    const existe = await models.Personas.findOne({
      where : { dni: dataUpdated.dni}
    });

    if(existe){
      throw new Error ('Ya existe una Persona con ese DNI.')
    }else{
      return await models.Personas.create(dataCreate);
    }

    


    
    

    
  } catch (err) {
    console.error('🛑 Error when creating Personas', err);
    throw err;
  }
};

const updatePersonas = async (Personas_id, dataUpdated) => {
  
  try {
    

    const oldPersonas = await models.Personas.findByPk(Personas_id, { include: { all: true } });

    const dataUpdate = {
      name: dataUpdated.name,
      lastname: dataUpdated.lastname,
      adress: dataUpdated.address,
      adress_number: dataUpdated.adress_number,
      dni: dataUpdated.dni,
      phone: dataUpdated.phone,
      cuil: dataUpdated.cuil,
      email: dataUpdated.email,
    };

    const newPersonas = await oldPersonas.update(dataUpdate);

  
    

    console.log(`✅ Personas "${newPersonas.name}" was created with images`);

    return newPersonas;
  } catch (err) {
    console.error('🛑 Error when updating Personas', err);
    throw err;
  }
};

const deletePersonas = async (Personas_id, data) => {
  try {
    const deletedPersonas = await models.Personas.findByPk(Personas_id, { include: { all: true } });
    

    if (deletedPersonas === null) {
    return console.error(`🛑 Personas with id: ${Personas_id} not found`);
      
    }

    
    // await models.Persona.destroy({ where: { id: pedidos_id } });
    
    
    

    await models.Personas.destroy({ where: { id: Personas_id } });

    console.log(`✅ Personas with id: ${Personas_id} was deleted successfully`);
    return deletedPersonas;
  } catch (err) {
    console.error('🛑 Error when deleting Personas', err);
    throw err;
  }
};

module.exports = {
  listAllPersonas, listOnePersonas, createPersonas, updatePersonas, deletePersonas,
};
