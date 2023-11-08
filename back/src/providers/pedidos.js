var models = require('../models');
const listAllPedidos= async () => {
  try {
    const Pedidos = await models.Pedidos.findAll(
       {
        include: { all: true },
       },
    );
    console.log('✅ Pedidos were found');
    return Pedidos;
  } catch (err) {
    console.error('🛑 Error when fetching Pedidos', err);
    throw err;
  }
};

const listOnePedidos= async (pedidos_id) => {
  try {
    const onePedidos= await models.Pedidos.findByPk(pedidos_id, {
      include: { all: true },
    });
    if (!onePedidos) {
      console.error(`🛑 Pedidoswith id ${pedidos_id} not found`);
      return null;
    }
    return onePedidos;
  } catch (err) {
    console.error('🛑 Error when fetching Pedidos', err);
    throw err;
  }
};

const createPedidos= async (PedidosData) => {
  

  try {
    transaction = await models.sequelize.transaction();
    
    const dataPedidos= {
      name: PedidosData.name,
      description: PedidosData.description,
      subtotal: PedidosData.price,
      category: PedidosData.category,
      state: PedidosData.state  
    };

    const insumosData = PedidosData.insumosEntity_id.map(item => ({
        insumoEntityId: item.id,
        cantidad: item.cantidad
      }));

    const newPedidos= await models.Pedidos.create(dataPedidos);

    for (const insumo of insumosData) {
        const insumoEntity = await models.InsumosEntities.findByPk(insumo.insumoEntityId);
        if (insumoEntity) {
          await models.PedidosInsumos.create({
            pedidoId: newPedidos.id,
            insumoEntityId: insumo.insumoEntityId,
            cantidad: insumo.cantidad
          });
        }
    }

    console.log(`✅ Pedidos"${newPedidos.name}" was created with images`);

    return newPedidos;
  } catch (err) {
    console.error('🛑 Error when creating Pedidos', err);
    throw err;
  }
};

const updatePedidos= async (pedidos_id, dataUpdated) => {
  

  try {
    transaction = await models.sequelize.transaction();

    const oldPedidos= await models.Pedidos.findByPk(pedidos_id, 
        { include: { all: true } 
    });

    
    const newPedidos= await oldPedidos.update(dataUpdated);
    

    console.log(`✅ Pedidos"${newPedidos.name}" was created with images`);

    return newPedidos;
  } catch (err) {
    console.error('🛑 Error when updating Pedidos', err);
    throw err;
  }
};

const deletePedidos= async (pedidos_id) => {
  try {
    const deletedPedidos= await models.Pedidos.findByPk(pedidos_id,
        { include: { all: true } 
    });
    

    if (deletedPedidos=== 0) {
      console.error(`🛑 Pedidoswith id: ${pedidos_id} not found`);
      return null;
    }

    await models.Pedidos.destroy({ where: { id: pedidos_id } });

    console.log(`✅ Pedidoswith id: ${pedidos_id} was deleted successfully`);
    return deletedPedidos;
  } catch (err) {
    console.error('🛑 Error when deleting Pedidos', err);
    throw err;
  }
};

module.exports = {
  listAllPedidos, listOnePedidos, createPedidos, updatePedidos, deletePedidos,
};
