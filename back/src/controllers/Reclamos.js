

const { ReclamosService } = require("../services");


const listAllReclamos = async (req, res) => {
  try {
    const Reclamos = await ReclamosService.listAllReclamos();
    res.json(Reclamos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneReclamos = async (req, res) => {
  try {
    const id = req.params.Reclamos_id;
    const Reclamos = await ReclamosService.listOneReclamos(id);
    res.json(Reclamos);

  } catch (err) {
    res.status(500).json({ action: "listOneReclamos", error: err.message });
  }

};

const createReclamos = async (req, res) => {

  try {
    const newReclamos = await ReclamosService.createReclamos(req.body);

    res.json(newReclamos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Reclamos.' });
  }
};

const updateReclamos = async (req, res) => {

  try {
    const ReclamosUpdate = await ReclamosService.updateReclamos(req.params.Reclamos_id, req.body);
    res.json(ReclamosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateReclamos', error: err.message });
  }
};

const deleteReclamos = async (req, res) => {
  const id = req.params.Reclamos_id;
  try {
    await ReclamosService.deleteReclamos(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteReclamos', error: err.message });
  }
};



module.exports = {
  listAllReclamos, listOneReclamos, createReclamos, updateReclamos, deleteReclamos, 
};
