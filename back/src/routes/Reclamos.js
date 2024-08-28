
    const express = require('express');
    const router = express.Router();
    const {ReclamosController }= require('../controllers');

    router.get('/', ReclamosController.listAllReclamos);
    router.get('/:Reclamos_id', ReclamosController.listOneReclamos);
    router.post('/', ReclamosController.createReclamos);
    router.put('/:Reclamos_id', ReclamosController.updateReclamos);
    router.delete('/:Reclamos_id', ReclamosController.deleteReclamos);

    module.exports = router;
    