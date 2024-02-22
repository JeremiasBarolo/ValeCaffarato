const { provinciasService } = require("../services");


const listAllProvincias = async (req, res) => {
  try {
    const Provincias = await provinciasService.listAllProvincias();
    res.json(Provincias);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneProvincias = async (req, res) => {
  try {
    const id = req.params.Provincias_id;
    const Provincias = await provinciasService.listOneProvincias(id);
    res.json(Provincias);

  } catch (err) {
    res.status(500).json({ action: "listOneProvincias", error: err.message });
  }

};

const createProvincias = async (req, res) => {

  try {
    const newProvincias = await provinciasService.createProvincias(req.body);

    console.log(`✅ Provincias "${newProvincias.name}" was created  `);
    res.json(newProvincias);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Provincias.' });
  }
};

const updateProvincias = async (req, res) => {

  try {
    const ProvinciasUpdate = await provinciasService.updateProvincias(req.params.Provincias_id, req.body);
    res.json(ProvinciasUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateProvincias', error: err.message });
  }
};

const deleteProvincias = async (req, res) => {
  const id = req.params.Provincias_id;
  try {
    await provinciasService.deleteProvincias(id);
    res.json({ message: `✅  Provincias with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteProvincias', error: err.message });
  }
};



module.exports = {
  listAllProvincias, listOneProvincias, createProvincias, updateProvincias, deleteProvincias, 
};
