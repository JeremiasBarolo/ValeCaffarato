const express = require("express")
const { empleadosController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", empleadosController.listAllEmpleado);

// create
router.post("/", empleadosController.createEmpleado);

// get one
router.get("/:empleados_id", empleadosController.listOneEmpleado);

// update
router.put("/:empleados_id", empleadosController.updateEmpleado);

// delete 
router.delete("/:empleados_id", empleadosController.deleteEmpleado);


module.exports = router;

