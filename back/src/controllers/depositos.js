const { depositosService } = require("../services");


const listAllDepositos = async (req, res) => {
  try {
    const Depositos = await depositosService.listAllDepositos();
    res.json(Depositos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneDepositos = async (req, res) => {
  try {
    const id = req.params.Depositos_id;
    const Depositos = await depositosService.listOneDepositos(id);
    res.json(Depositos);

  } catch (err) {
    res.status(500).json({ action: "listOneDepositos", error: err.message });
  }

};

const createDepositos = async (req, res) => {

  try {
    const newDepositos = await depositosService.createDepositos(req.body);

    console.log(`✅ Depositos "${newDepositos.name}" was created  `);
    res.json(newDepositos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Depositos.' });
  }
};

const updateDepositos = async (req, res) => {

  try {
    const DepositosUpdate = await depositosService.updateDepositos(req.params.Depositos_id, req.body);
    res.json(DepositosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateDepositos', error: err.message });
  }
};

const deleteDepositos = async (req, res) => {
  const id = req.params.Depositos_id;
  try {
    await depositosService.deleteDepositos(id);
    res.json({ message: `✅  Depositos with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteDepositos', error: err.message });
  }
};



module.exports = {
  listAllDepositos, listOneDepositos, createDepositos, updateDepositos, deleteDepositos, 
};
