var models = require('../models');
const uuid = require('uuid');
const listAllDepositos= async () => {
  try {
    const Depositos = await models.Depositos.findAll(
       {
        include: { all: true },
       },
    );
    console.log('✅ Depositos were found');
    return Depositos;
  } catch (err) {
    console.error('🛑 Error when fetching Depositos', err);
    throw err;
  }
};

const listOneDepositos= async (Depositos_id) => {
  try {
    const oneDepositos= await models.Depositos.findByPk(Depositos_id, 
    {
      include: { all: true },
    },
    );
    if (!oneDepositos) {
      console.error(`🛑 Depositoswith id ${Depositos_id} not found`);
      return null;
    }
    return oneDepositos;
  } catch (err) {
    console.error('🛑 Error when fetching Depositos', err);
    throw err;
  }
};

const createDepositos= async (DepositosData) => {
  

  try {
    
    const dataDepositos= {
      description: DepositosData.description,
    };
    

    const newDepositos= await models.Depositos.create(dataDepositos);
    
    // await DepositosData.pedido.forEach(async element => {
    //     await models.PedidoDepositos.create({
    //         DepositosId: newDepositos.id,
    //         pedidoId: element.id
    //       })
    // });

    // await models.PersonaDepositos.create({
    //     DepositosId: newDepositos.id,
    //     personaId: DepositosData.cliente
    // })
    
    console.log(`✅ Depositos"${newDepositos.id}" was created`);
    return newDepositos;
    
    
  } catch (err) {
    console.error('🛑 Error when creating Depositos', err);
    throw err;
  }
};

const updateDepositos= async (Depositos_id, dataUpdated) => {
  

  try {

    const oldDepositos= await models.Depositos.findByPk(Depositos_id);
    
    let newDepositos = await oldDepositos.update(dataUpdated);

    return newDepositos;
  } catch (err) {
    console.error('🛑 Error when updating Depositos', err);
    throw err;
  }
  
};


const deleteDepositos = async (Depositos_id) => {
  try {
    const deletedDepositos = await models.Depositos.findByPk(Depositos_id, 
        // { 
        //     include: { all: true } ,
        // }
    );

    if (!deletedDepositos) {
      console.error(`🛑 Depositos with id: ${Depositos_id} not found`);
      return null;
    }

    
//   for (const persona of deletedDepositos.Personas) {

//     if(persona){
//         await models.PersonaDepositos.destroy({ where:  
//             { 
//               personaId: persona.id,
//               DepositosId: deletedDepositos.id
//             } });
//     }  
//   }

//   for(const pedido of deletedDepositos.Pedidos){
//     if(pedido){
//         await models.PedidoDepositos.destroy({ where:  
//             { 
//               pedidoId: pedido.id,
//               DepositosId: deletedDepositos.id
//             } });
//     }  
//   }

    
    await models.Depositos.destroy({ where: { id: Depositos_id } });

    console.log(`✅ Depositos with id: ${Depositos_id} was deleted successfully`);
    return deletedDepositos;
  } catch (err) {
    console.error('🛑 Error when deleting Depositos', err);
    throw err;
  }
};


module.exports = {
  listAllDepositos, listOneDepositos, createDepositos, updateDepositos, deleteDepositos,
};
