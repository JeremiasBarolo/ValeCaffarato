

    var models = require('../models');

    const listAllTipo_Persona= async () => {
    try {
        const Tipo_Persona = await models.Tipo_Persona.findAll({
            include: { all: true },
          },
            
        );
        console.log('✅ Tipo_Persona were found');
        return Tipo_Persona;
    } catch (err) {
        console.error('🛑 Error when fetching Tipo_Persona', err);
        throw err;
    }
    };

    const listOneTipo_Persona= async (Tipo_Persona_id) => {
    try {
        const oneTipo_Persona= await models.Tipo_Persona.findByPk(Tipo_Persona_id, 
            {
                include: { all: true },
              },
        );
        if (!oneTipo_Persona) {
        
        return null;
        }
        return oneTipo_Persona;
    } catch (err) {
        
        throw err;
    }
    };

    const createTipo_Persona= async (DataTipo_Persona) => {
    

    try {
        
        const newTipo_Persona= await models.Tipo_Persona.create(DataTipo_Persona);
        
        return newTipo_Persona;
        
    } catch (err) {
        console.error('🛑 Error when creating Tipo_Persona', err);
        throw err;
    }
    };

    const updateTipo_Persona= async (Tipo_Persona_id, dataUpdated) => {
    

    try {

        const oldTipo_Persona= await models.Tipo_Persona.findByPk(Tipo_Persona_id, {
            include: { all: true },
          },);
        
        let newTipo_Persona = await oldTipo_Persona.update(dataUpdated);

        return newTipo_Persona;
    } catch (err) {
        console.error('🛑 Error when updating Tipo_Persona', err);
        throw err;
    }
    
    };


    const deleteTipo_Persona = async (Tipo_Persona_id) => {
    try {
        const deletedTipo_Persona = await models.Tipo_Persona.findByPk(Tipo_Persona_id, 
            {
                include: { all: true },
              },
        );

        if (!deletedTipo_Persona) {
        return null;
        }
        
        await models.Tipo_Persona.destroy({ where: { id: Tipo_Persona_id } });


        return deletedTipo_Persona;
    } catch (err) {
        console.error('🛑 Error when deleting Tipo_Persona', err);
        throw err;
    }
    };


    module.exports = {
    listAllTipo_Persona, listOneTipo_Persona, createTipo_Persona, updateTipo_Persona, deleteTipo_Persona,
    };

