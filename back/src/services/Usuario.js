

        const { UsuarioProvider } = require('../providers');

        const listAllUsuario = async () => {
            return await UsuarioProvider.listAllUsuario();
        };

        const listOneUsuario = async (Usuario_id) => {
            return await UsuarioProvider.listOneUsuario(Usuario_id);
        };

        const createUsuario = async (UsuarioData) => {
            return await UsuarioProvider.createUsuario(UsuarioData);
        };


        const updateUsuario = async (Usuario_id, updateUsuario) => {
            return await UsuarioProvider.updateUsuario(Usuario_id, updateUsuario);
        };

        const deleteUsuario = async (Usuario_id) => {
            return await UsuarioProvider.deleteUsuario(Usuario_id);
        };


        module.exports = {
        listAllUsuario, listOneUsuario, createUsuario, updateUsuario, deleteUsuario, 
        };

