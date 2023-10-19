const { compraPreparacionService } = require("../services");


const listAllCompraPreparacion = async (req, res) => {
  try {
    const compraPreparacion = await compraPreparacionService.listAllCompraPreparacion();
    res.json(compraPreparacion);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneCompraPreparacion = async (req, res) => {
  try {
    const id = req.params.compraPreparacion_id;
    const compraPreparacion = await compraPreparacionService.listOneCompraPreparacion(id);
    res.json(compraPreparacion);

  } catch (err) {
    res.status(500).json({ action: "listOnecompraPreparacion", error: err.message });
  }

};

const createCompraPreparacion = async (req, res) => {

  try {
    const newcompraPreparacion = await compraPreparacionService.createCompraPreparacion(req.body);

    console.log(`✅ compraPreparacion "${newcompraPreparacion.name}" was created  `);
    res.json(newcompraPreparacion);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create compraPreparacion.' });
  }
};

const updateCompraPreparacion = async (req, res) => {

  try {
    const compraPreparacionUpdate = await compraPreparacionService.updateCompraPreparacion(req.params.compraPreparacion_id, req.body);
    res.json(compraPreparacionUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatecompraPreparacion', error: err.message });
  }
};

const deleteCompraPreparacion = async (req, res) => {
  const id = req.params.compraPreparacion_id;
  try {
    await compraPreparacionService.deleteCompraPreparacion(id);
    res.json({ message: `✅  compraPreparacion with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deletecompraPreparacion', error: err.message });
  }
};



module.exports = {
  listAllCompraPreparacion, listOneCompraPreparacion, createCompraPreparacion, updateCompraPreparacion, deleteCompraPreparacion, 
};
