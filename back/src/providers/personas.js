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
    const Personas = await models.Personas.findAll(
      {
        include: { all: true },
      }
    );
    console.log('✅ Personas were found');
    return Personas;
  } catch (err) {
    console.error('🛑 Error when fetching Personas', err);
    throw err;
  }
};

const listOnePersonas = async (Personas_id) => {
  try {
    const onePersonas = await models.Personas.findByPk(Personas_id,
      {
        include: { all: true },
      });
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
      categoria: dataUpdated.categoria

    };

    const newPersonas = await models.Personas.create(dataCreate);

    const categoria = dataUpdated.categoria;

    if(categoria === 'EMPLEADO'){
        await models.Empleados.create({
            personaId: newPersonas.id,
            cargo: dataUpdated.cargo
        })
    }else if(categoria === 'CLIENTE'){
        await models.Clientes.create({
            personaId: newPersonas.id,
            industry: dataUpdated.industry,
            city: dataUpdated.city
        })
    }else{
        await models.Proveedores.create({
            personaId: newPersonas.id,
            industry: dataUpdated.industry,
            city: dataUpdated.city
        })
      }
    
    console.log(`✅ Personas "${newPersonas.name}" was created with images`);

    return newPersonas;
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
      categoria: dataUpdated.categoria

    };

    if(dataUpdate.categoria === 'CLIENTE'){

      if (oldPersonas.cliente.length > 0) {
        clienteId = oldPersonas.cliente[0].dataValues.id;
      } 
      const cliente = await models.Clientes.findByPk(clienteId)
      await cliente.update({
        industry: dataUpdated.industry,
        city: dataUpdated.city
      }) 
    }
    else if(dataUpdate.categoria === 'PROVEEDOR'){

          if (oldPersonas.proveedor.length > 0) {
            proveedorId = oldPersonas.proveedor[0].dataValues.id;
          } 

        const proveedor = await models.Proveedores.findByPk(proveedorId)
        await proveedor.update({
          industry: dataUpdated.industry,
          city: dataUpdated.city
        })

    }
    else{
      if (oldPersonas.empleado.length > 0) {
        empleadoId = oldPersonas.empleado[0].dataValues.id;
      }

        const cliente = await models.Empleados.findByPk(empleadoId)
        await cliente.update({
          cargo: dataUpdated.cargo
        })
    }

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

    // if(data === 'EMPLEADOS'){
    //     for (const cargo of deletedPedidos.empleado) {
      
    //         await models.Empleados.destroy({ where:  
    //           { 
    //             personaId: Personas_id,
    //             cargo: cargo
    //           } });
    //       }
          
      
          
    //       await models.Persona.destroy({ where: { id: pedidos_id } });
    // }

    // if(data === 'CLIENTES'){
    //     for (const dataPersona of deletedPedidos.cliente) {
      
    //         await models.Clientes.destroy({ where:  
    //           { 
    //             personaId: Personas_id,
    //             industry: dataPersona.industry,
    //             city: dataPersona.city

    //           } });
    //       }
          
      
          
    //       await models.Persona.destroy({ where: { id: pedidos_id } });
    // }

    // if(data === 'PROVEEDORES'){
    //     for (const dataPersona of deletedPedidos.proveedor) {
      
    //         await models.Empleados.destroy({ where:  
    //           { 
    //             personaId: Personas_id,
    //             industry: dataPersona.industry,
    //             city: dataPersona.city
    //           } });
    //       }
          
      
          
    //       await models.Persona.destroy({ where: { id: pedidos_id } });
    // }
    
    

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
