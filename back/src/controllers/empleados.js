const { empleadosService } = require("../services");


const listAllEmpleado = async (req, res) => {
  try {
    const empleado = await empleadosService.listAllEmpleado();
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneEmpleado = async (req, res) => {
  try {
    const id = req.params.empleados_id;
    const empleado = await empleadosService.listOneEmpleado(id);
    res.json(empleado);

  } catch (err) {
    res.status(500).json({ action: "listOneEmpleado", error: err.message });
  }

};

const createEmpleado = async (req, res) => {

  try {

    const {
        name, lastname, adress, adressNumber, dni, city, phone, cuit, email, role
    } = req.body;

    // if (name || lastname || adress || adressNumber || dni || city || phone || cuit || email || role == undefined) {
    //   return res.status(400).json({ message: 'Faltan campos requeridos' });
    // }

    const newEmpleado = await empleadosService.createEmpleado(req.body);

    console.log(`✅ Empleado "${newEmpleado.name}" was created  `);
    res.json(newEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Empleado.' });
  }
};

const updateEmpleado = async (req, res) => {

  try {
    const empleadoUpdate = await empleadosService.updateEmpleado(req.params.empleados_id, req.body);
    res.json(empleadoUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateEmpleado', error: err.message });
  }
};

const deleteEmpleado = async (req, res) => {
  const id = req.params.empleados_id;
  try {
    await empleadosService.deleteEmpleado(id);
    res.json({ message: `✅  Empleado with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteEmpleado', error: err.message });
  }
};



module.exports = {
  listAllEmpleado, listOneEmpleado, createEmpleado, updateEmpleado, deleteEmpleado, 
};
