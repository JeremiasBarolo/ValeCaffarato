const express = require("express")
const { clientesController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", clientesController.listAllCliente);

// create
router.post("/", clientesController.createCliente);

// get one
router.get("/:cliente_id", clientesController.listOneCliente);

// update
router.put("/:cliente_id", clientesController.updateCliente);

// delete 
router.delete("/:cliente_id", clientesController.deleteCliente);


module.exports = router;

