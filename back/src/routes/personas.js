
const express = require("express")
const { personasController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", personasController.listAllPersonas);

// create
router.post("/", personasController.createPersonas);

// get one
router.get("/:Personas_id", personasController.listOnePersonas);

// update
router.put("/:Personas_id", personasController.updatePersonas);

// delete 
router.delete("/:Personas_id", personasController.deletePersonas);


module.exports = router;