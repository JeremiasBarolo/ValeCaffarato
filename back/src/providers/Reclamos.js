

    var models = require('../models');

    const listAllReclamos= async () => {
    try {
        const Reclamos = await models.Reclamos.findAll(
        );
        console.log('✅ Reclamos were found');
        return Reclamos;
    } catch (err) {
        console.error('🛑 Error when fetching Reclamos', err);
        throw err;
    }
    };

    const listOneReclamos= async (Reclamos_id) => {
    try {
        const oneReclamos= await models.Reclamos.findByPk(Reclamos_id, 
        );
        if (!oneReclamos) {
        
        return null;
        }
        return oneReclamos;
    } catch (err) {
        
        throw err;
    }
    };

    const createReclamos= async (DataReclamos) => {
    

    try {
        
        const newReclamos= await models.Reclamos.create(DataReclamos);
        
        return newReclamos;
        
    } catch (err) {
        console.error('🛑 Error when creating Reclamos', err);
        throw err;
    }
    };

    const updateReclamos= async (Reclamos_id, dataUpdated) => {
    

    try {

        const oldReclamos= await models.Reclamos.findByPk(Reclamos_id);
        
        let newReclamos = await oldReclamos.update(dataUpdated);

        return newReclamos;
    } catch (err) {
        console.error('🛑 Error when updating Reclamos', err);
        throw err;
    }
    
    };


    const deleteReclamos = async (Reclamos_id) => {
    try {
        const deletedReclamos = await models.Reclamos.findByPk(Reclamos_id, 
        );

        if (!deletedReclamos) {
        return null;
        }
        
        await models.Reclamos.destroy({ where: { id: Reclamos_id } });


        return deletedReclamos;
    } catch (err) {
        console.error('🛑 Error when deleting Reclamos', err);
        throw err;
    }
    };


    module.exports = {
    listAllReclamos, listOneReclamos, createReclamos, updateReclamos, deleteReclamos,
    };

