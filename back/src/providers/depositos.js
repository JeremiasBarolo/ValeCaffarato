var models = require('../models');
const uuid = require('uuid');
const listAllDepositos= async () => {
  try {
    const Depositos = await models.Depositos.findAll(
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
    );

    if (!deletedDepositos) {
      console.error(`🛑 Depositos with id: ${Depositos_id} not found`);
      return null;
    }
    
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
