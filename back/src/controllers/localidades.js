const { localidadesService } = require("../services");


const listAllLocalidades = async (req, res) => {
  try {
    const Localidades = await localidadesService.listAllLocalidades();
    res.json(Localidades);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneLocalidades = async (req, res) => {
  try {
    const id = req.params.Localidades_id;
    const Localidades = await localidadesService.listOneLocalidades(id);
    res.json(Localidades);

  } catch (err) {
    res.status(500).json({ action: "listOneLocalidades", error: err.message });
  }

};

const createLocalidades = async (req, res) => {

  try {
    const newLocalidades = await localidadesService.createLocalidades(req.body);

    console.log(`✅ Localidades "${newLocalidades.name}" was created  `);
    res.json(newLocalidades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLocalidades = async (req, res) => {

  try {
    const LocalidadesUpdate = await localidadesService.updateLocalidades(req.params.Localidades_id, req.body);
    res.json(LocalidadesUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateLocalidades', error: err.message });
  }
};

const deleteLocalidades = async (req, res) => {
  const id = req.params.Localidades_id;
  try {
    await localidadesService.deleteLocalidades(id);
    res.json({ message: `✅  Localidades with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteLocalidades', error: err.message });
  }
};



module.exports = {
  listAllLocalidades, listOneLocalidades, createLocalidades, updateLocalidades, deleteLocalidades, 
};
