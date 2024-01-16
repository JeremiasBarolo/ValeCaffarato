

        const { Tipo_PersonaProvider } = require('../providers');

        const listAllTipo_Persona = async () => {
            return await Tipo_PersonaProvider.listAllTipo_Persona();
        };

        const listOneTipo_Persona = async (Tipo_Persona_id) => {
            return await Tipo_PersonaProvider.listOneTipo_Persona(Tipo_Persona_id);
        };

        const createTipo_Persona = async (Tipo_PersonaData) => {
            return await Tipo_PersonaProvider.createTipo_Persona(Tipo_PersonaData);
        };


        const updateTipo_Persona = async (Tipo_Persona_id, updateTipo_Persona) => {
            return await Tipo_PersonaProvider.updateTipo_Persona(Tipo_Persona_id, updateTipo_Persona);
        };

        const deleteTipo_Persona = async (Tipo_Persona_id) => {
            return await Tipo_PersonaProvider.deleteTipo_Persona(Tipo_Persona_id);
        };


        module.exports = {
        listAllTipo_Persona, listOneTipo_Persona, createTipo_Persona, updateTipo_Persona, deleteTipo_Persona, 
        };

