const { maestroArticulosService } = require("../services");


const listAllMaestroArticulos = async (req, res) => {
  try {
    const MaestroArticulos = await maestroArticulosService.listAllMaestroArticulos();
    res.json(MaestroArticulos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneMaestroArticulos = async (req, res) => {
  try {
    const id = req.params.MaestroArticulos_id;
    const MaestroArticulos = await maestroArticulosService.listOneMaestroArticulos(id);
    res.json(MaestroArticulos);

  } catch (err) {
    res.status(500).json({ action: "listOneMaestroArticulos", error: err.message });
  }

};

const createMaestroArticulos = async (req, res) => {

  try {
    const newMaestroArticulos = await maestroArticulosService.createMaestroArticulos(req.body);

    console.log(`✅ MaestroArticulos "${newMaestroArticulos.name}" was created  `);
    res.json(newMaestroArticulos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create MaestroArticulos.' });
  }
};

const updateMaestroArticulos = async (req, res) => {

  try {
    const MaestroArticulosUpdate = await maestroArticulosService.updateMaestroArticulos(req.params.MaestroArticulos_id, req.body);
    res.json(MaestroArticulosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateMaestroArticulos', error: err.message });
  }
};

const deleteMaestroArticulos = async (req, res) => {
  const id = req.params.MaestroArticulos_id;
  try {
    await maestroArticulosService.deleteMaestroArticulos(id);
    res.json({ message: `✅  MaestroArticulos with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteMaestroArticulos', error: err.message });
  }
};



module.exports = {
  listAllMaestroArticulos, listOneMaestroArticulos, createMaestroArticulos, updateMaestroArticulos, deleteMaestroArticulos, 
};
