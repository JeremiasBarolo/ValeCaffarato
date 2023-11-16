const { personasService } = require("../services");


const listAllPersonas = async (req, res) => {
  try {
    const Personas = await personasService.listAllPersonas();
    res.json(Personas);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnePersonas = async (req, res) => {
  try {
    const id = req.params.Personas_id;
    const Personas = await personasService.listOnePersonas(id);
    res.json(Personas);

  } catch (err) {
    res.status(500).json({ action: "listOnePersonas", error: err.message });
  }

};

const createPersonas = async (req, res) => {

  try {
    const newPersonas = await personasService.createPersonas(req.body);

    console.log(`✅ Personas "${newPersonas.name}" was created  `);
    res.json(newPersonas);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Personas.' });
  }
};

const updatePersonas = async (req, res) => {

  try {
    const PersonasUpdate = await personasService.updatePersonas(req.params.Personas_id, req.body);
    res.json(PersonasUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatePersonas', error: err.message });
  }
};

const deletePersonas = async (req, res) => {
  const id = req.params.Personas_id;
  try {
   eliminado = await personasService.deletePersonas(id);
    res.json(eliminado);
  } catch (err) {
    res.status(500).json({ action: 'deletePersonas', error: err.message });
  }
};



module.exports = {
  listAllPersonas, listOnePersonas, createPersonas, updatePersonas, deletePersonas, 
};
