
    const express = require('express');
    const router = express.Router();
    const { UsuarioController }= require('../controllers');

    router.get('/', UsuarioController.listAllUsuario);
    router.get('/:Usuario_id', UsuarioController.listOneUsuario);
    router.post('/', UsuarioController.createUsuario);
    router.put('/:Usuario_id', UsuarioController.updateUsuario);
    router.delete('/:Usuario_id', UsuarioController.deleteUsuario);

    module.exports = router;
    