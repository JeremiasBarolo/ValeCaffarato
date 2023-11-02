const express = require("express")
const { compraFinalizacionController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", compraFinalizacionController.listAllCompraFinalizacion);

// create
router.post("/", compraFinalizacionController.createCompraFinalizacion);

// get one
router.get("/:compraFinalizacion_id", compraFinalizacionController.listOneCompraFinalizacion);

// update
router.put("/:compraFinalizacion_id", compraFinalizacionController.updateCompraFinalizacion);

// delete 
router.delete("/:compraFinalizacion_id", compraFinalizacionController.deleteCompraFinalizacion);

// finalizar
router.put("/", compraFinalizacionController.finalizarPedido);



module.exports = router;