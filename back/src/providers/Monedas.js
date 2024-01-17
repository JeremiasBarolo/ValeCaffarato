

    var models = require('../models');

    const listAllMonedas= async () => {
    try {
        const Monedas = await models.Monedas.findAll(
        );
        console.log('✅ Monedas were found');
        return Monedas;
    } catch (err) {
        console.error('🛑 Error when fetching Monedas', err);
        throw err;
    }
    };

    const listOneMonedas= async (Monedas_id) => {
    try {
        const oneMonedas= await models.Monedas.findByPk(Monedas_id, 
        );
        if (!oneMonedas) {
        return null;
        }
        return oneMonedas;
    } catch (err) {
        
        throw err;
    }
    };

    const createMonedas= async (DataMonedas) => {
    

    try {
        
        const newMonedas= await models.Monedas.create(DataMonedas);
        
        return newMonedas;
        
    } catch (err) {
        console.error('🛑 Error when creating Monedas', err);
        throw err;
    }
    };

    const updateMonedas= async (Monedas_id, dataUpdated) => {
    

    try {

        const oldMonedas= await models.Monedas.findByPk(Monedas_id);
        
        let newMonedas = await oldMonedas.update(dataUpdated);

        return newMonedas;
    } catch (err) {
        console.error('🛑 Error when updating Monedas', err);
        throw err;
    }
    
    };


    const deleteMonedas = async (Monedas_id) => {
    try {
        const deletedMonedas = await models.Monedas.findByPk(Monedas_id, 
        );

        if (!deletedMonedas) {
        return null;
        }
        
        await models.Monedas.destroy({ where: { id: Monedas_id } });


        return deletedMonedas;
    } catch (err) {
        console.error('🛑 Error when deleting Monedas', err);
        throw err;
    }
    };


    module.exports = {
    listAllMonedas, listOneMonedas, createMonedas, updateMonedas, deleteMonedas,
    };

