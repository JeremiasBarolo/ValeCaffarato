
    const express = require('express');
    const router = express.Router();
    const {Tipo_PersonaController }= require('../controllers');

    router.get('/', Tipo_PersonaController.listAllTipo_Persona);
    router.get('/:Tipo_Persona_id', Tipo_PersonaController.listOneTipo_Persona);
    router.post('/', Tipo_PersonaController.createTipo_Persona);
    router.put('/:Tipo_Persona_id', Tipo_PersonaController.updateTipo_Persona);
    router.delete('/:Tipo_Persona_id', Tipo_PersonaController.deleteTipo_Persona);

    module.exports = router;
    