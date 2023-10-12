/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable function-paren-newline */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
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
