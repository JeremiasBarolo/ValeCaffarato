
const express = require("express")
const { localidadesController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", localidadesController.listAllLocalidades);

// create
router.post("/" ,localidadesController.createLocalidades);

// get one
router.get("/:Localidades_id", localidadesController.listOneLocalidades);

// update
router.put("/:Localidades_id", localidadesController.updateLocalidades);

// delete 
router.delete("/:Localidades_id", localidadesController.deleteLocalidades);


module.exports = router;