
const express = require("express")
const { pedidosController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", pedidosController.listAllPedidos);

// create
router.post("/", pedidosController.createPedidos);

// get one
router.get("/:Pedidos_id", pedidosController.listOnePedidos);

// update
router.put("/:Pedidos_id", pedidosController.updatePedidos);

// delete 
router.delete("/:Pedidos_id", pedidosController.deletePedidos);


module.exports = router;