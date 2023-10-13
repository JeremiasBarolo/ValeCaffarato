const { proveedoresService } = require("../services");


const listAllProveedor = async (req, res) => {
  try {
    const Proveedor = await proveedoresService.listAllProveedor();
    res.json(Proveedor);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneProveedor = async (req, res) => {
  try {
    const id = req.params.proveedor_id;
    const Proveedor = await proveedoresService.listOneProveedor(id);
    res.json(Proveedor);

  } catch (err) {
    res.status(500).json({ action: "listOneProveedor", error: err.message });
  }

};

const createProveedor = async (req, res) => {

  try {

    const {
        name, lastname, adress, adressNumber, dni, city, phone, cuit, email, role
    } = req.body;

    // if (name || lastname || adress || adressNumber || dni || city || phone || cuit || email || role == undefined) {
    //   return res.status(400).json({ message: 'Faltan campos requeridos' });
    // }

    const newProveedor = await proveedoresService.createProveedor(req.body);

    console.log(`✅ Proveedor "${newProveedor.name}" was created  `);
    res.json(newProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Proveedor.' });
  }
};

const updateProveedor = async (req, res) => {

  try {
    const ProveedorUpdate = await proveedoresService.updateProveedor(req.params.proveedor_id, req.body);
    res.json(ProveedorUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateProveedor', error: err.message });
  }
};

const deleteProveedor = async (req, res) => {
  const id = req.params.proveedor_id;
  try {
    await proveedoresService.deleteProveedor(id);
    res.json({ message: `✅  Proveedor with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteProveedor', error: err.message });
  }
};



module.exports = {
  listAllProveedor, listOneProveedor, createProveedor, updateProveedor, deleteProveedor, 
};
