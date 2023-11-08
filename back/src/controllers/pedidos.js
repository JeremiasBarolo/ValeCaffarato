const { pedidosService } = require("../services");


const listAllPedidos = async (req, res) => {
  try {
    const Pedidos = await pedidosService.listAllPedidos();
    res.json(Pedidos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnePedidos = async (req, res) => {
  try {
    const id = req.params.Pedidos_id;
    const Pedidos = await pedidosService.listOnePedidos(id);
    res.json(Pedidos);

  } catch (err) {
    res.status(500).json({ action: "listOnePedidos", error: err.message });
  }

};

const createPedidos = async (req, res) => {

  try {
    const newPedidos = await pedidosService.createPedidos(req.body);

    console.log(`✅ Pedidos "${newPedidos.name}" was created  `);
    res.json(newPedidos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Pedidos.' });
  }
};

const updatePedidos = async (req, res) => {

  try {
    const PedidosUpdate = await pedidosService.updatePedidos(req.params.Pedidos_id, req.body);
    res.json(PedidosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatePedidos', error: err.message });
  }
};

const deletePedidos = async (req, res) => {
  const id = req.params.Pedidos_id;
  try {
    await pedidosService.deletePedidos(id);
    res.json({ message: `✅  Pedidos with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deletePedidos', error: err.message });
  }
};



module.exports = {
  listAllPedidos, listOnePedidos, createPedidos, updatePedidos, deletePedidos, 
};
