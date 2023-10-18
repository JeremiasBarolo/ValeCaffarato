const { compraPresupuestoProvider } = require('../providers');

const listAllCompraPresupuesto = async () => {
    return await compraPresupuestoProvider.listAllCompraPresupuesto();
};

const listOneCompraPresupuesto = async (compraPresupuesto_id) => {
    return await compraPresupuestoProvider.listOneCompraPresupuesto(compraPresupuesto_id);
};

const createCompraPresupuesto = async (compraPresupuestoData) => {
    return await compraPresupuestoProvider.createCompraPresupuesto(compraPresupuestoData);
};


const updateCompraPresupuesto = async (compraPresupuesto_id, updatecompraPresupuesto) => {
    return await compraPresupuestoProvider.updateCompraPresupuesto(compraPresupuesto_id, updatecompraPresupuesto);
};

const deleteCompraPresupuesto = async (compraPresupuesto_id) => {
    return await compraPresupuestoProvider.deleteCompraPresupuesto(compraPresupuesto_id);
};


module.exports = {
    listAllCompraPresupuesto, listOneCompraPresupuesto, createCompraPresupuesto, updateCompraPresupuesto, deleteCompraPresupuesto, 
};
