
const express = require("express")
const { paisesController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", paisesController.listAllPaises);

// create
router.post("/" ,paisesController.createPaises);

// get one
router.get("/:Paises_id", paisesController.listOnePaises);

// update
router.put("/:Paises_id", paisesController.updatePaises);

// delete 
router.delete("/:Paises_id", paisesController.deletePaises);


module.exports = router;