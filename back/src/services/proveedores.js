const { proveedoresProvider } = require('../providers');

const listAllProveedor = async () => {
    return await proveedoresProvider.listAllProveedor();
};

const listOneProveedor = async (proveedor_id) => {
    return await proveedoresProvider.listOneProveedor(proveedor_id);
};

const createProveedor = async (proveedorData) => {
    return await proveedoresProvider.createProveedor(proveedorData);
};


const updateProveedor = async (proveedor_id, updateProveedor) => {
    return await proveedoresProvider.updateProveedor(proveedor_id, updateProveedor);
};

const deleteProveedor = async (proveedor_id) => {
    return await proveedoresProvider.deleteProveedor(proveedor_id);
};


module.exports = {
 listAllProveedor, listOneProveedor, createProveedor, updateProveedor, deleteProveedor, 
};
