

const { MonedasService } = require("../services");


const listAllMonedas = async (req, res) => {
  try {
    const Monedas = await MonedasService.listAllMonedas();
    res.json(Monedas);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneMonedas = async (req, res) => {
  try {
    const id = req.params.Monedas_id;
    const Monedas = await MonedasService.listOneMonedas(id);
    res.json(Monedas);

  } catch (err) {
    res.status(500).json({ action: "listOneMonedas", error: err.message });
  }

};

const createMonedas = async (req, res) => {

  try {
    const newMonedas = await MonedasService.createMonedas(req.body);

    res.json(newMonedas);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Monedas.' });
  }
};

const updateMonedas = async (req, res) => {

  try {
    const MonedasUpdate = await MonedasService.updateMonedas(req.params.Monedas_id, req.body);
    res.json(MonedasUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateMonedas', error: err.message });
  }
};

const deleteMonedas = async (req, res) => {
  const id = req.params.Monedas_id;
  try {
    await MonedasService.deleteMonedas(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteMonedas', error: err.message });
  }
};



module.exports = {
  listAllMonedas, listOneMonedas, createMonedas, updateMonedas, deleteMonedas, 
};
