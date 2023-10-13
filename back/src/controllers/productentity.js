const { productentityService } = require("../services");


const listAllProductentity = async (req, res) => {
  try {
    const Productentity = await productentityService.listAllProductentity();
    res.json(Productentity);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneProductentity = async (req, res) => {
  try {
    const id = req.params.productentity_id;
    const Productentity = await productentityService.listOneProductentity(id);
    res.json(Productentity);

  } catch (err) {
    res.status(500).json({ action: "listOneProductentity", error: err.message });
  }

};

const createProductentity = async (req, res) => {

  try {

    const {
        name, lastname, adress, adressNumber, dni, city, phone, cuit, email, role
    } = req.body;

    // if (name || lastname || adress || adressNumber || dni || city || phone || cuit || email || role == undefined) {
    //   return res.status(400).json({ message: 'Faltan campos requeridos' });
    // }

    const newProductentity = await productentityService.createProductentity(req.body);

    console.log(`✅ Productentity "${newProductentity.name}" was created  `);
    res.json(newProductentity);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Productentity.' });
  }
};

const updateProductentity = async (req, res) => {

  try {
    const ProductentityUpdate = await productentityService.updateProductentity(req.params.productentity_id, req.body);
    res.json(ProductentityUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateProductentity', error: err.message });
  }
};

const deleteProductentity = async (req, res) => {
  const id = req.params.productentity_id;
  try {
    await productentityService.deleteProductentity(id);
    res.json({ message: `✅  Productentity with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteProductentity', error: err.message });
  }
};



module.exports = {
  listAllProductentity, listOneProductentity, createProductentity, updateProductentity, deleteProductentity, 
};
