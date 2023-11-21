const { productosProvider } = require('../providers');

const listAllProductos = async () => {
    return await productosProvider.listAllProductos();
};

const listOneProductos = async (productos_id) => {
    return await productosProvider.listOneProductos(productos_id);
};

const createProductos = async (productosData) => {
    return await productosProvider.createProductos(productosData);
};


const updateProductos = async (productos_id, updateProductos) => {
    return await productosProvider.updateProductos(productos_id, updateProductos);
};

const deleteProductos = async (productos_id) => {
    return await productosProvider.deleteProductos(productos_id);
};


module.exports = {
 listAllProductos, listOneProductos, createProductos, updateProductos, deleteProductos, 
};
