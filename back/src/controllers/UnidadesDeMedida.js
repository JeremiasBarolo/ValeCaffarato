

const { UnidadesDeMedidaService } = require("../services");


const listAllUnidadesDeMedida = async (req, res) => {
  try {
    const UnidadesDeMedida = await UnidadesDeMedidaService.listAllUnidadesDeMedida();
    res.json(UnidadesDeMedida);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneUnidadesDeMedida = async (req, res) => {
  try {
    const id = req.params.UnidadesDeMedida_id;
    const UnidadesDeMedida = await UnidadesDeMedidaService.listOneUnidadesDeMedida(id);
    res.json(UnidadesDeMedida);

  } catch (err) {
    res.status(500).json({ action: "listOneUnidadesDeMedida", error: err.message });
  }

};

const createUnidadesDeMedida = async (req, res) => {

  try {
    const newUnidadesDeMedida = await UnidadesDeMedidaService.createUnidadesDeMedida(req.body);

    res.json(newUnidadesDeMedida);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create UnidadesDeMedida.' });
  }
};

const updateUnidadesDeMedida = async (req, res) => {

  try {
    const UnidadesDeMedidaUpdate = await UnidadesDeMedidaService.updateUnidadesDeMedida(req.params.UnidadesDeMedida_id, req.body);
    res.json(UnidadesDeMedidaUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateUnidadesDeMedida', error: err.message });
  }
};

const deleteUnidadesDeMedida = async (req, res) => {
  const id = req.params.UnidadesDeMedida_id;
  try {
    await UnidadesDeMedidaService.deleteUnidadesDeMedida(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteUnidadesDeMedida', error: err.message });
  }
};



module.exports = {
  listAllUnidadesDeMedida, listOneUnidadesDeMedida, createUnidadesDeMedida, updateUnidadesDeMedida, deleteUnidadesDeMedida, 
};
