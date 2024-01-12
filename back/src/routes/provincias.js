
const express = require("express")
const { provinciasController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", provinciasController.listAllProvincias);

// create
router.post("/" ,provinciasController.createProvincias);

// get one
router.get("/:Provincias_id", provinciasController.listOneProvincias);

// update
router.put("/:Provincias_id", provinciasController.updateProvincias);

// delete 
router.delete("/:Provincias_id", provinciasController.deleteProvincias);


module.exports = router;