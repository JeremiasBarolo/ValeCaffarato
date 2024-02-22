const { paisesService } = require("../services");


const listAllPaises = async (req, res) => {
  try {
    const Paises = await paisesService.listAllPaises();
    res.json(Paises);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnePaises = async (req, res) => {
  try {
    const id = req.params.Paises_id;
    const Paises = await paisesService.listOnePaises(id);
    res.json(Paises);

  } catch (err) {
    res.status(500).json({ action: "listOnePaises", error: err.message });
  }

};

const createPaises = async (req, res) => {

  try {
    const newPaises = await paisesService.createPaises(req.body);

    console.log(`✅ Paises "${newPaises.name}" was created  `);
    res.json(newPaises);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Paises.' });
  }
};

const updatePaises = async (req, res) => {

  try {
    const PaisesUpdate = await paisesService.updatePaises(req.params.Paises_id, req.body);
    res.json(PaisesUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatePaises', error: err.message });
  }
};

const deletePaises = async (req, res) => {
  const id = req.params.Paises_id;
  try {
    await paisesService.deletePaises(id);
    res.json({ message: `✅  Paises with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deletePaises', error: err.message });
  }
};



module.exports = {
  listAllPaises, listOnePaises, createPaises, updatePaises, deletePaises, 
};
