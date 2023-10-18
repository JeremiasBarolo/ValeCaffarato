
const express = require("express")
const { insumoController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", insumoController.listAllInsumo);

// create
router.post("/", insumoController.createInsumo);

// get one
router.get("/:insumo_id", insumoController.listOneInsumo);

// update
router.put("/:insumo_id", insumoController.updateInsumo);

// delete 
router.delete("/:insumo_id", insumoController.deleteInsumo);


module.exports = router;