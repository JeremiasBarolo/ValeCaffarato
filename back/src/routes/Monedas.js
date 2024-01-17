
    const express = require('express');
    const router = express.Router();
    const {MonedasController }= require('../controllers');

    router.get('/', MonedasController.listAllMonedas);
    router.get('/:Monedas_id', MonedasController.listOneMonedas);
    router.post('/', MonedasController.createMonedas);
    router.put('/:Monedas_id', MonedasController.updateMonedas);
    router.delete('/:Monedas_id', MonedasController.deleteMonedas);

    module.exports = router;
    