
    const express = require('express');
    const router = express.Router();
    const {Tipo_ReclamoController }= require('../controllers');

    router.get('/', Tipo_ReclamoController.listAllTipo_Reclamo);
    router.get('/:Tipo_Reclamo_id', Tipo_ReclamoController.listOneTipo_Reclamo);
    router.post('/', Tipo_ReclamoController.createTipo_Reclamo);
    router.put('/:Tipo_Reclamo_id', Tipo_ReclamoController.updateTipo_Reclamo);
    router.delete('/:Tipo_Reclamo_id', Tipo_ReclamoController.deleteTipo_Reclamo);

    module.exports = router;
    