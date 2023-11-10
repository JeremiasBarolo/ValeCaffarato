const express = require("express")
const { cantidadesController } = require("../controllers");
const router = express.Router();


// get all
router.get("/", cantidadesController.listAllCantidades);


module.exports = router;