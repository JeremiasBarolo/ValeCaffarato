const { productosService } = require("../services");


const listAllProductos = async (req, res) => {
  try {
    const Productos = await productosService.listAllProductos();
    res.json(Productos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneProductos = async (req, res) => {
  try {
    const id = req.params.productos_id;
    const Productos = await productosService.listOneProductos(id);
    res.json(Productos);

  } catch (err) {
    res.status(500).json({ action: "listOneProductos", error: err.message });
  }

};

const createProductos = async (req, res) => {

  try {
    const newProductos = await productosService.createProductos(req.body);

    console.log(`✅ Productos "${newProductos.name}" was created  `);
    res.json(newProductos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Productos.' });
  }
};

const updateProductos = async (req, res) => {

  try {
    const ProductosUpdate = await productosService.updateProductos(req.params.productos_id, req.body);
    res.json(ProductosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateProductos', error: err.message });
  }
};

const deleteProductos = async (req, res) => {
  const id = req.params.productos_id;
  try {
    await productosService.deleteProductos(id);
    res.json({ message: `✅  Productos with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteProductos', error: err.message });
  }
};



module.exports = {
    listAllProductos, listOneProductos, createProductos, updateProductos, deleteProductos, 
};
