const express = require("express")
const { compraPreparacionController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", compraPreparacionController.listAllCompraPreparacion);

// create
router.post("/", compraPreparacionController.createCompraPreparacion);

// get one
router.get("/:compraPreparacion_id", compraPreparacionController.listOneCompraPreparacion);

// update
router.put("/:compraPreparacion_id", compraPreparacionController.updateCompraPreparacion);

// delete 
router.delete("/:compraPreparacion_id", compraPreparacionController.deleteCompraPreparacion);


module.exports = router;