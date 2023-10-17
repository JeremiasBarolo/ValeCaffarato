
const express = require("express")
const { insumosentityController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", insumosentityController.listAllInsumosentity);

// create
router.post("/", insumosentityController.createInsumosentity);

// get one
router.get("/:insumosentity_id", insumosentityController.listOneInsumosentity);

// update
router.put("/:insumosentity_id", insumosentityController.updateInsumosentity);

// delete 
router.delete("/:insumosentity_id", insumosentityController.deleteInsumosentity);


module.exports = router;