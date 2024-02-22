

    var models = require('../models');

    const listAllCond_Iva= async () => {
    try {
        const Cond_Iva = await models.Cond_Iva.findAll(
            {
                include: { all: true },
              },
        );
        console.log('✅ Cond_Iva were found');
        return Cond_Iva;
    } catch (err) {
        console.error('🛑 Error when fetching Cond_Iva', err);
        throw err;
    }
    };

    const listOneCond_Iva= async (Cond_Iva_id) => {
    try {
        const oneCond_Iva= await models.Cond_Iva.findByPk(Cond_Iva_id, 
            {
                include: { all: true },
              },
        );
        if (!oneCond_Iva) {
        
        return null;
        }
        return oneCond_Iva;
    } catch (err) {
        
        throw err;
    }
    };

    const createCond_Iva= async (DataCond_Iva) => {
    

    try {
        
        const newCond_Iva= await models.Cond_Iva.create(DataCond_Iva);
        
        return newCond_Iva;
        
    } catch (err) {
        console.error('🛑 Error when creating Cond_Iva', err);
        throw err;
    }
    };

    const updateCond_Iva= async (Cond_Iva_id, dataUpdated) => {
    

    try {

        const oldCond_Iva= await models.Cond_Iva.findByPk(Cond_Iva_id, {
            include: { all: true },
          },);
        
        let newCond_Iva = await oldCond_Iva.update(dataUpdated);

        return newCond_Iva;
    } catch (err) {
        console.error('🛑 Error when updating Cond_Iva', err);
        throw err;
    }
    
    };


    const deleteCond_Iva = async (Cond_Iva_id) => {
    try {
        const deletedCond_Iva = await models.Cond_Iva.findByPk(Cond_Iva_id, 
            {
                include: { all: true },
              },
        );

        if (!deletedCond_Iva) {
        return null;
        }
        
        await models.Cond_Iva.destroy({ where: { id: Cond_Iva_id } });


        return deletedCond_Iva;
    } catch (err) {
        console.error('🛑 Error when deleting Cond_Iva', err);
        throw err;
    }
    };


    module.exports = {
    listAllCond_Iva, listOneCond_Iva, createCond_Iva, updateCond_Iva, deleteCond_Iva,
    };

