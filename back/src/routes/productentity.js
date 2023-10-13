const express = require("express")
const { productentityController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", productentityController.listAllProductentity);

// create
router.post("/", productentityController.createProductentity);

// get one
router.get("/:productentity_id", productentityController.listOneProductentity);

// update
router.put("/:productentity_id", productentityController.updateProductentity);

// delete 
router.delete("/:productentity_id", productentityController.deleteProductentity);


module.exports = router;