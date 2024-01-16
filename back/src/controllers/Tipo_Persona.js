

const { Tipo_PersonaService } = require("../services");


const listAllTipo_Persona = async (req, res) => {
  try {
    const Tipo_Persona = await Tipo_PersonaService.listAllTipo_Persona();
    res.json(Tipo_Persona);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneTipo_Persona = async (req, res) => {
  try {
    const id = req.params.Tipo_Persona_id;
    const Tipo_Persona = await Tipo_PersonaService.listOneTipo_Persona(id);
    res.json(Tipo_Persona);

  } catch (err) {
    res.status(500).json({ action: "listOneTipo_Persona", error: err.message });
  }

};

const createTipo_Persona = async (req, res) => {

  try {
    const newTipo_Persona = await Tipo_PersonaService.createTipo_Persona(req.body);

    res.json(newTipo_Persona);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Tipo_Persona.' });
  }
};

const updateTipo_Persona = async (req, res) => {

  try {
    const Tipo_PersonaUpdate = await Tipo_PersonaService.updateTipo_Persona(req.params.Tipo_Persona_id, req.body);
    res.json(Tipo_PersonaUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateTipo_Persona', error: err.message });
  }
};

const deleteTipo_Persona = async (req, res) => {
  const id = req.params.Tipo_Persona_id;
  try {
    await Tipo_PersonaService.deleteTipo_Persona(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteTipo_Persona', error: err.message });
  }
};



module.exports = {
  listAllTipo_Persona, listOneTipo_Persona, createTipo_Persona, updateTipo_Persona, deleteTipo_Persona, 
};
