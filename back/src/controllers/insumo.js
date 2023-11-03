const { insumoService } = require("../services");


const listAllInsumo = async (req, res) => {
  try {
    const Insumo = await insumoService.listAllInsumo();
    res.json(Insumo);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneInsumo = async (req, res) => {
  try {
    const id = req.params.insumo_id;
    const Insumo = await insumoService.listOneInsumo(id);
    res.json(Insumo);

  } catch (err) {
    res.status(500).json({ action: "listOneInsumo", error: err.message });
  }

};

const createInsumo = async (req, res) => {

  try {
    const newInsumo = await insumoService.createInsumo(req.body);

    console.log(`✅ Insumo "${newInsumo.name}" was created  `);
    res.json(newInsumo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Insumo.' });
  }
};

const updateInsumo = async (req, res) => {

  try {
    const InsumoUpdate = await insumoService.updateInsumo(req.params.insumo_id, req.body);
    res.json(InsumoUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateInsumo', error: err.message });
  }
};

const deleteInsumo = async (req, res) => {
  const id = req.params.insumo_id;
  try {
    await insumoService.deleteInsumo(id);
    res.json({ message: `✅  Insumo with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteInsumo', error: err.message });
  }
};



module.exports = {
  listAllInsumo, listOneInsumo, createInsumo, updateInsumo, deleteInsumo, 
};
