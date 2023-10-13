const express = require("express")
const { proveedoresController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", proveedoresController.listAllProveedor);

// create
router.post("/", proveedoresController.createProveedor);

// get one
router.get("/:proveedor_id", proveedoresController.listOneProveedor);

// update
router.put("/:proveedor_id", proveedoresController.updateProveedor);

// delete 
router.delete("/:proveedor_id", proveedoresController.deleteProveedor);


module.exports = router;