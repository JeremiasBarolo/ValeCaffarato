

    var models = require('../models');

    const listAllUnidadesDeMedida= async () => {
    try {
        const UnidadesDeMedida = await models.UnidadesDeMedida.findAll(
        );
        console.log('✅ UnidadesDeMedida were found');
        return UnidadesDeMedida;
    } catch (err) {
        console.error('🛑 Error when fetching UnidadesDeMedida', err);
        throw err;
    }
    };

    const listOneUnidadesDeMedida= async (UnidadesDeMedida_id) => {
    try {
        const oneUnidadesDeMedida= await models.UnidadesDeMedida.findByPk(UnidadesDeMedida_id, 
        );
        if (!oneUnidadesDeMedida) {
        
        return null;
        }
        return oneUnidadesDeMedida;
    } catch (err) {
        
        throw err;
    }
    };

    const createUnidadesDeMedida= async (DataUnidadesDeMedida) => {
    

    try {
        
        const newUnidadesDeMedida= await models.UnidadesDeMedida.create(DataUnidadesDeMedida);
        
        return newUnidadesDeMedida;
        
    } catch (err) {
        console.error('🛑 Error when creating UnidadesDeMedida', err);
        throw err;
    }
    };

    const updateUnidadesDeMedida= async (UnidadesDeMedida_id, dataUpdated) => {
    

    try {

        const oldUnidadesDeMedida= await models.UnidadesDeMedida.findByPk(UnidadesDeMedida_id);
        
        let newUnidadesDeMedida = await oldUnidadesDeMedida.update(dataUpdated);

        return newUnidadesDeMedida;
    } catch (err) {
        console.error('🛑 Error when updating UnidadesDeMedida', err);
        throw err;
    }
    
    };


    const deleteUnidadesDeMedida = async (UnidadesDeMedida_id) => {
    try {
        const deletedUnidadesDeMedida = await models.UnidadesDeMedida.findByPk(UnidadesDeMedida_id, 
        );

        if (!deletedUnidadesDeMedida) {
        return null;
        }
        
        await models.UnidadesDeMedida.destroy({ where: { id: UnidadesDeMedida_id } });


        return deletedUnidadesDeMedida;
    } catch (err) {
        console.error('🛑 Error when deleting UnidadesDeMedida', err);
        throw err;
    }
    };


    module.exports = {
    listAllUnidadesDeMedida, listOneUnidadesDeMedida, createUnidadesDeMedida, updateUnidadesDeMedida, deleteUnidadesDeMedida,
    };

