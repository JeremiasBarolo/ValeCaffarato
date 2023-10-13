const { insumosentityService } = require("../services");


const listAllInsumosentity = async (req, res) => {
  try {
    const Insumosentity = await insumosentityService.listAllInsumosentity();
    res.json(Insumosentity);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneInsumosentity = async (req, res) => {
  try {
    const id = req.params.insumosentity_id;
    const Insumosentity = await insumosentityService.listOneInsumosentity(id);
    res.json(Insumosentity);

  } catch (err) {
    res.status(500).json({ action: "listOneInsumosentity", error: err.message });
  }

};

const createInsumosentity = async (req, res) => {

  try {
    const newInsumosentity = await insumosentityService.createInsumosentity(req.body);

    console.log(`✅ Insumosentity "${newInsumosentity.name}" was created  `);
    res.json(newInsumosentity);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Insumosentity.' });
  }
};

const updateInsumosentity = async (req, res) => {

  try {
    const InsumosentityUpdate = await insumosentityService.updateInsumosentity(req.params.insumosentity_id, req.body);
    res.json(InsumosentityUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateInsumosentity', error: err.message });
  }
};

const deleteInsumosentity = async (req, res) => {
  const id = req.params.insumosentity_id;
  try {
    await insumosentityService.deleteInsumosentity(id);
    res.json({ message: `✅  Insumosentity with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteInsumosentity', error: err.message });
  }
};



module.exports = {
  listAllInsumosentity, listOneInsumosentity, createInsumosentity, updateInsumosentity, deleteInsumosentity, 
};
