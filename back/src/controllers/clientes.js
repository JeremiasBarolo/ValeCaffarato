const { clientesService } = require("../services");


const listAllCliente= async (req, res) => {
  try {
    const Cliente= await clientesService.listAllCliente();
    res.json(Cliente);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneCliente= async (req, res) => {
  try {
    const id = req.params.cliente_id;
    
    const Cliente= await clientesService.listOneCliente(id);
    res.json(Cliente);

  } catch (err) {
    res.status(500).json({ action: "listOneCliente", error: err.message });
  }

};

const createCliente= async (req, res) => {

  try {

    const newCliente= await clientesService.createCliente(req.body);

    console.log(`✅ Cliente"${newCliente.name}" was created  `);
    res.json(newCliente);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Cliente.' });
  }
};

const updateCliente= async (req, res) => {

  try {
    const ClienteUpdate = await clientesService.updateCliente(req.params.cliente_id, req.body);
    res.json(ClienteUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateCliente', error: err.message });
  }
};

const deleteCliente= async (req, res) => {
  const id = req.params.cliente_id;
  try {
    await clientesService.deleteCliente(id);
    res.json({ message: `✅  Clientewith the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteCliente', error: err.message });
  }
};



module.exports = {
  listAllCliente, listOneCliente, createCliente, updateCliente, deleteCliente, 
};
