const { compraPresupuestoService } = require("../services");


const listAllCompraPresupuesto = async (req, res) => {
  try {
    const compraPresupuesto = await compraPresupuestoService.listAllCompraPresupuesto();
    res.json(compraPresupuesto);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneCompraPresupuesto = async (req, res) => {
  try {
    const id = req.params.compraPresupuesto_id;
    const compraPresupuesto = await compraPresupuestoService.listOneCompraPresupuesto(id);
    res.json(compraPresupuesto);

  } catch (err) {
    res.status(500).json({ action: "listOnecompraPresupuesto", error: err.message });
  }

};

const createCompraPresupuesto = async (req, res) => {

  try {
    const newcompraPresupuesto = await compraPresupuestoService.createCompraPresupuesto(req.body);

    console.log(`✅ compraPresupuesto "${newcompraPresupuesto.name}" was created  `);
    res.json(newcompraPresupuesto);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create compraPresupuesto.' });
  }
};

const updateCompraPresupuesto = async (req, res) => {

  try {
    const compraPresupuestoUpdate = await compraPresupuestoService.updateCompraPresupuesto(req.params.compraPresupuesto_id, req.body);
    res.json(compraPresupuestoUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatecompraPresupuesto', error: err.message });
  }
};

const deleteCompraPresupuesto = async (req, res) => {
  const id = req.params.compraPresupuesto_id;
  try {
    await compraPresupuestoService.deleteCompraPresupuesto(id);
    res.json({ message: `✅  compraPresupuesto with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deletecompraPresupuesto', error: err.message });
  }
};



module.exports = {
  listAllCompraPresupuesto, listOneCompraPresupuesto, createCompraPresupuesto, updateCompraPresupuesto, deleteCompraPresupuesto, 
};
