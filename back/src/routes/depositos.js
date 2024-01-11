
const express = require("express")
const { depositosController } = require("../controllers");
const router = express.Router();




// get all
router.get("/", depositosController.listAllDepositos);

// create
router.post("/" ,depositosController.createDepositos);

// get one
router.get("/:Depositos_id", depositosController.listOneDepositos);

// update
router.put("/:Depositos_id", depositosController.updateDepositos);

// delete 
router.delete("/:Depositos_id", depositosController.deleteDepositos);


module.exports = router;