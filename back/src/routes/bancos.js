
const express = require("express")
const { bancosController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", bancosController.listAllBancos);

// create
router.post("/" ,bancosController.createBancos);

// get one
router.get("/:Bancos_id", bancosController.listOneBancos);

// update
router.put("/:Bancos_id", bancosController.updateBancos);

// delete 
router.delete("/:Bancos_id", bancosController.deleteBancos);


module.exports = router;