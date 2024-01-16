

const { Cond_IvaService } = require("../services");


const listAllCond_Iva = async (req, res) => {
  try {
    const Cond_Iva = await Cond_IvaService.listAllCond_Iva();
    res.json(Cond_Iva);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneCond_Iva = async (req, res) => {
  try {
    const id = req.params.Cond_Iva_id;
    const Cond_Iva = await Cond_IvaService.listOneCond_Iva(id);
    res.json(Cond_Iva);

  } catch (err) {
    res.status(500).json({ action: "listOneCond_Iva", error: err.message });
  }

};

const createCond_Iva = async (req, res) => {

  try {
    const newCond_Iva = await Cond_IvaService.createCond_Iva(req.body);

    res.json(newCond_Iva);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Cond_Iva.' });
  }
};

const updateCond_Iva = async (req, res) => {

  try {
    const Cond_IvaUpdate = await Cond_IvaService.updateCond_Iva(req.params.Cond_Iva_id, req.body);
    res.json(Cond_IvaUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateCond_Iva', error: err.message });
  }
};

const deleteCond_Iva = async (req, res) => {
  const id = req.params.Cond_Iva_id;
  try {
    await Cond_IvaService.deleteCond_Iva(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteCond_Iva', error: err.message });
  }
};



module.exports = {
  listAllCond_Iva, listOneCond_Iva, createCond_Iva, updateCond_Iva, deleteCond_Iva, 
};
