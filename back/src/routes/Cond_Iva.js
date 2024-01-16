
    const express = require('express');
    const router = express.Router();
    const {Cond_IvaController }= require('../controllers');

    router.get('/', Cond_IvaController.listAllCond_Iva);
    router.get('/:Cond_Iva_id', Cond_IvaController.listOneCond_Iva);
    router.post('/', Cond_IvaController.createCond_Iva);
    router.put('/:Cond_Iva_id', Cond_IvaController.updateCond_Iva);
    router.delete('/:Cond_Iva_id', Cond_IvaController.deleteCond_Iva);

    module.exports = router;
    