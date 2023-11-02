const { compraFinalizacionService } = require("../services");


const listAllCompraFinalizacion = async (req, res) => {
  try {
    const compraFinalizacion = await compraFinalizacionService.listAllCompraFinalizacion();
    res.json(compraFinalizacion);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneCompraFinalizacion = async (req, res) => {
  try {
    const id = req.params.compraFinalizacion_id;
    const compraFinalizacion = await compraFinalizacionService.listOneCompraFinalizacion(id);
    res.json(compraFinalizacion);

  } catch (err) {
    res.status(500).json({ action: "listOnecompraFinalizacion", error: err.message });
  }

};

const createCompraFinalizacion = async (req, res) => {

  try {
    const newcompraFinalizacion = await compraFinalizacionService.createCompraFinalizacion(req.body);

    console.log(`✅ compraFinalizacion "${newcompraFinalizacion.name}" was created  `);
    res.json(newcompraFinalizacion);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create compraFinalizacion.' });
  }
};

const updateCompraFinalizacion = async (req, res) => {

  try {
    const compraFinalizacionUpdate = await compraFinalizacionService.updateCompraFinalizacion(req.params.compraFinalizacion_id, req.body);
    res.json(compraFinalizacionUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatecompraFinalizacion', error: err.message });
  }
};

const deleteCompraFinalizacion = async (req, res) => {
  const id = req.params.compraFinalizacion_id;
  try {
    await compraFinalizacionService.deleteCompraFinalizacion(id);
    res.json({ message: `✅  compraFinalizacion with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deletecompraFinalizacion', error: err.message });
  }
};

const finalizarPedido = async (req, res) => {

  try {
    const newcompraFinalizacion = await compraFinalizacionService.finalizarPedido(req.body);

    console.log(`✅ compraFinalizacion "${newcompraFinalizacion.name}" was created  `);
    res.json(newcompraFinalizacion);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create compraFinalizacion.' });
  }
};



module.exports = {
  listAllCompraFinalizacion, listOneCompraFinalizacion, createCompraFinalizacion, updateCompraFinalizacion, deleteCompraFinalizacion, finalizarPedido
};
