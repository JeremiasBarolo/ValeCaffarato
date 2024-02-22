const { bancosService } = require("../services");


const listAllBancos = async (req, res) => {
  try {
    const Bancos = await bancosService.listAllBancos();
    res.json(Bancos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneBancos = async (req, res) => {
  try {
    const id = req.params.Bancos_id;
    const Bancos = await bancosService.listOneBancos(id);
    res.json(Bancos);

  } catch (err) {
    res.status(500).json({ action: "listOneBancos", error: err.message });
  }

};

const createBancos = async (req, res) => {

  try {
    const newBancos = await bancosService.createBancos(req.body);

    console.log(`✅ Bancos "${newBancos.name}" was created  `);
    res.json(newBancos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Bancos.' });
  }
};

const updateBancos = async (req, res) => {

  try {
    const BancosUpdate = await bancosService.updateBancos(req.params.Bancos_id, req.body);
    res.json(BancosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateBancos', error: err.message });
  }
};

const deleteBancos = async (req, res) => {
  const id = req.params.Bancos_id;
  try {
    await bancosService.deleteBancos(id);
    res.json({ message: `✅  Bancos with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteBancos', error: err.message });
  }
};



module.exports = {
  listAllBancos, listOneBancos, createBancos, updateBancos, deleteBancos, 
};
