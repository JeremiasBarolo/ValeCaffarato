const { empleadosProvider } = require('../providers');

const listAllEmpleado = async () => {
    return await empleadosProvider.listAllEmpleado();
};

const listOneEmpleado = async (empleado_id) => {
    return await empleadosProvider.listOneEmpleado(empleado_id);
};

const createEmpleado = async (EmpleadoData) => {
    return await empleadosProvider.createEmpleado(EmpleadoData);
};


const updateEmpleado = async (empleado_id, updateEmpleado) => {
    return await empleadosProvider.updateEmpleado(empleado_id, updateEmpleado);
};

const deleteEmpleado = async (empleado_id) => {
    return await empleadosProvider.deleteEmpleado(empleado_id);
};


module.exports = {
 listAllEmpleado, listOneEmpleado, createEmpleado, updateEmpleado, deleteEmpleado, 
};
