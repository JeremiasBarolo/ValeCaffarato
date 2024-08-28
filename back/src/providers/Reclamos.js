

    var models = require('../models');

    const listAllReclamos= async () => {
    try {
        const Reclamos = await models.Reclamos.findAll(
            {
                include: [
                    {
                        model: models.Personas,
                    },
                    {
                        model: models.Pedidos,
                    },
                    {
                        model: models.Tipo_Reclamo,
                    },
                ],
            }
        );
        console.log('✅ Reclamos were found');
        return Reclamos.map(reclamo => ({
            id: reclamo.id,
            Persona:`${reclamo.Persona.name} ${reclamo.Persona.lastname}`,
            detalles_reclamos: reclamo.detalles_reclamo,
            TipoReclamo: reclamo.Tipo_Reclamo.des_reclamo,
            pedidoFecha: reclamo.Pedido.createdAt,
            pedidoId: reclamo.Pedido.id,
            Reclamo: reclamo
          }))
    } catch (err) {
        console.error('🛑 Error when fetching Reclamos', err);
        throw err;
    }
    };

    const listOneReclamos= async (Reclamos_id) => {
    try {
        const oneReclamos= await models.Reclamos.findByPk(Reclamos_id, 
        );
        if (!oneReclamos) {
        
        return null;
        }
        return oneReclamos;
    } catch (err) {
        
        throw err;
    }
    };

    const createReclamos= async (DataReclamos) => {
    

    try {
        const pedido = await models.Pedidos.findByPk(DataReclamos.pedidoId);

        let dataReclamos= {
            id_tipo_reclamo: DataReclamos.tipoReclamoId,
            detalles_reclamo: DataReclamos.detalles_reclamo,
            id_pedido: DataReclamos.pedidoId,
            id_persona:pedido.personaId,
          };
        
        const newReclamos= await models.Reclamos.create(dataReclamos);
        
        return newReclamos;
        
    } catch (err) {
        console.error('🛑 Error when creating Reclamos', err);
        throw err;
    }
    };

    const updateReclamos= async (Reclamos_id, dataUpdated) => {
    

    try {

        const oldReclamos= await models.Reclamos.findByPk(Reclamos_id);
        
        let newReclamos = await oldReclamos.update(dataUpdated);

        return newReclamos;
    } catch (err) {
        console.error('🛑 Error when updating Reclamos', err);
        throw err;
    }
    
    };


    const deleteReclamos = async (Reclamos_id) => {
    try {
        const deletedReclamos = await models.Reclamos.findByPk(Reclamos_id, 
        );

        if (!deletedReclamos) {
        return null;
        }
        
        await models.Reclamos.destroy({ where: { id: Reclamos_id } });


        return deletedReclamos;
    } catch (err) {
        console.error('🛑 Error when deleting Reclamos', err);
        throw err;
    }
    };


    module.exports = {
    listAllReclamos, listOneReclamos, createReclamos, updateReclamos, deleteReclamos,
    };

