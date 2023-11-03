
const express = require("express")
const { compraPresupuestoController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", compraPresupuestoController.listAllCompraPresupuesto);

// create
router.post("/", compraPresupuestoController.createCompraPresupuesto);

// get one
router.get("/:compraPresupuesto_id", compraPresupuestoController.listOneCompraPresupuesto);

// update
router.put("/:compraPresupuesto_id", compraPresupuestoController.updateCompraPresupuesto);

// delete 
router.delete("/:compraPresupuesto_id", compraPresupuestoController.deleteCompraPresupuesto);


module.exports = router;