
const express = require("express")
const { maestroArticulosController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", maestroArticulosController.listAllMaestroArticulos);

// create
router.post("/", maestroArticulosController.createMaestroArticulos);

// get one
router.get("/:MaestroArticulos_id", maestroArticulosController.listOneMaestroArticulos);

// update
router.put("/:MaestroArticulos_id", maestroArticulosController.updateMaestroArticulos);

// delete 
router.delete("/:MaestroArticulos_id", maestroArticulosController.deleteMaestroArticulos);


module.exports = router;