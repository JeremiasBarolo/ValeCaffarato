const express = require("express")
const { documentoController } = require("../controllers");
const router = express.Router();




// create
router.post("/" ,documentoController.generarPdf);





module.exports = router;