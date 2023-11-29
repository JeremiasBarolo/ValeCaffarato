
const express = require("express")
const { documentoController } = require("../controllers");
const router = express.Router();




// get all
router.get("/", documentoController.listAllDocumento);

// create
router.post("/" ,documentoController.createDocumento);

// get one
router.get("/:Documento_id", documentoController.listOneDocumento);

// update
router.put("/:Documento_id", documentoController.updateDocumento);

// delete 
router.delete("/:Documento_id", documentoController.deleteDocumento);


module.exports = router;