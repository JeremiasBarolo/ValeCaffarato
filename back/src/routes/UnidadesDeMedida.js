
    const express = require('express');
    const router = express.Router();
    const {UnidadesDeMedidaController }= require('../controllers');

    router.get('/', UnidadesDeMedidaController.listAllUnidadesDeMedida);
    router.get('/:UnidadesDeMedida_id', UnidadesDeMedidaController.listOneUnidadesDeMedida);
    router.post('/', UnidadesDeMedidaController.createUnidadesDeMedida);
    router.put('/:UnidadesDeMedida_id', UnidadesDeMedidaController.updateUnidadesDeMedida);
    router.delete('/:UnidadesDeMedida_id', UnidadesDeMedidaController.deleteUnidadesDeMedida);

    module.exports = router;
    