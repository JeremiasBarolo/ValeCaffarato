
    const bcrypt = require('bcrypt');
    var models = require('../models');

    const listAllUsuario= async () => {
    try {
        const Usuario = await models.Usuario.findAll(
        );
        console.log('✅ Usuario were found');
        return Usuario;
    } catch (err) {
        console.error('🛑 Error when fetching Usuario', err);
        throw err;
    }
    };

    const listOneUsuario= async (Usuario_id) => {
    try {
        const oneUsuario= await models.Usuario.findByPk(Usuario_id, 
        );
        if (!oneUsuario) {
        
        return null;
        }
        return oneUsuario;
    } catch (err) {
        
        throw err;
    }
    };

    const createUsuario= async (DataUsuario) => {
    
    const { username, password, rol } = DataUsuario;
    
    try {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error en el servidor');
          }
          
          await models.Usuario.create({ username: username, password: hash, rol: rol }); 
          return true
        });
        
        
    } catch (err) {
        console.error('🛑 Error when creating Usuario', err);
        throw err;
    }
    };

    const updateUsuario= async (Usuario_id, dataUpdated) => {
    

    try {

        const oldUsuario= await models.Usuario.findByPk(Usuario_id);
        
        let newUsuario = await oldUsuario.update(dataUpdated);

        return newUsuario;
    } catch (err) {
        console.error('🛑 Error when updating Usuario', err);
        throw err;
    }
    
    };


    const deleteUsuario = async (Usuario_id) => {
    try {
        const deletedUsuario = await models.Usuario.findByPk(Usuario_id, 
        );

        if (!deletedUsuario) {
        return null;
        }
        
        await models.Usuario.destroy({ where: { id: Usuario_id } });


        return deletedUsuario;
    } catch (err) {
        console.error('🛑 Error when deleting Usuario', err);
        throw err;
    }
    };


    module.exports = {
    listAllUsuario, listOneUsuario, createUsuario, updateUsuario, deleteUsuario,
    };

