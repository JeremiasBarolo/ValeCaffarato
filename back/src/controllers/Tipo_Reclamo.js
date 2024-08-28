

const { Tipo_ReclamoService } = require("../services");


const listAllTipo_Reclamo = async (req, res) => {
  try {
    const Tipo_Reclamo = await Tipo_ReclamoService.listAllTipo_Reclamo();
    res.json(Tipo_Reclamo);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneTipo_Reclamo = async (req, res) => {
  try {
    const id = req.params.Tipo_Reclamo_id;
    const Tipo_Reclamo = await Tipo_ReclamoService.listOneTipo_Reclamo(id);
    res.json(Tipo_Reclamo);

  } catch (err) {
    res.status(500).json({ action: "listOneTipo_Reclamo", error: err.message });
  }

};

const createTipo_Reclamo = async (req, res) => {

  try {
    const newTipo_Reclamo = await Tipo_ReclamoService.createTipo_Reclamo(req.body);

    res.json(newTipo_Reclamo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Tipo_Reclamo.' });
  }
};

const updateTipo_Reclamo = async (req, res) => {

  try {
    const Tipo_ReclamoUpdate = await Tipo_ReclamoService.updateTipo_Reclamo(req.params.Tipo_Reclamo_id, req.body);
    res.json(Tipo_ReclamoUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateTipo_Reclamo', error: err.message });
  }
};

const deleteTipo_Reclamo = async (req, res) => {
  const id = req.params.Tipo_Reclamo_id;
  try {
    await Tipo_ReclamoService.deleteTipo_Reclamo(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteTipo_Reclamo', error: err.message });
  }
};



module.exports = {
  listAllTipo_Reclamo, listOneTipo_Reclamo, createTipo_Reclamo, updateTipo_Reclamo, deleteTipo_Reclamo, 
};
