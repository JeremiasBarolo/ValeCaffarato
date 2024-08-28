

    var models = require('../models');

    const listAllTipo_Reclamo= async () => {
    try {
        const Tipo_Reclamo = await models.Tipo_Reclamo.findAll(
        );
        console.log('✅ Tipo_Reclamo were found');
        return Tipo_Reclamo;
    } catch (err) {
        console.error('🛑 Error when fetching Tipo_Reclamo', err);
        throw err;
    }
    };

    const listOneTipo_Reclamo= async (Tipo_Reclamo_id) => {
    try {
        const oneTipo_Reclamo= await models.Tipo_Reclamo.findByPk(Tipo_Reclamo_id, 
        );
        if (!oneTipo_Reclamo) {
        
        return null;
        }
        return oneTipo_Reclamo;
    } catch (err) {
        
        throw err;
    }
    };

    const createTipo_Reclamo= async (DataTipo_Reclamo) => {
    

    try {
        
        const newTipo_Reclamo= await models.Tipo_Reclamo.create(DataTipo_Reclamo);
        
        return newTipo_Reclamo;
        
    } catch (err) {
        console.error('🛑 Error when creating Tipo_Reclamo', err);
        throw err;
    }
    };

    const updateTipo_Reclamo= async (Tipo_Reclamo_id, dataUpdated) => {
    

    try {

        const oldTipo_Reclamo= await models.Tipo_Reclamo.findByPk(Tipo_Reclamo_id);
        
        let newTipo_Reclamo = await oldTipo_Reclamo.update(dataUpdated);

        return newTipo_Reclamo;
    } catch (err) {
        console.error('🛑 Error when updating Tipo_Reclamo', err);
        throw err;
    }
    
    };


    const deleteTipo_Reclamo = async (Tipo_Reclamo_id) => {
    try {
        const deletedTipo_Reclamo = await models.Tipo_Reclamo.findByPk(Tipo_Reclamo_id, 
        );

        if (!deletedTipo_Reclamo) {
        return null;
        }
        
        await models.Tipo_Reclamo.destroy({ where: { id: Tipo_Reclamo_id } });


        return deletedTipo_Reclamo;
    } catch (err) {
        console.error('🛑 Error when deleting Tipo_Reclamo', err);
        throw err;
    }
    };


    module.exports = {
    listAllTipo_Reclamo, listOneTipo_Reclamo, createTipo_Reclamo, updateTipo_Reclamo, deleteTipo_Reclamo,
    };

