const express = require("express")
const { productosController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", productosController.listAllProductos);

// create
router.post("/", productosController.createProductos);

// get one
router.get("/:productos_id", productosController.listOneProductos);

// update
router.put("/:productos_id", productosController.updateProductos);

// delete 
router.delete("/:productos_id", productosController.deleteProductos);


module.exports = router;