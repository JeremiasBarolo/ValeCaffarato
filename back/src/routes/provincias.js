
const express = require("express")
const { provinciasController } = require("../controllers");
const router = express.Router();
var models = require('../models');


// get all
router.get("/", provinciasController.listAllProvincias);

// create
router.post("/" ,provinciasController.createProvincias);

// get one
router.get("/:Provincias_id", provinciasController.listOneProvincias);

// update
router.put("/:Provincias_id", provinciasController.updateProvincias);

// delete 
router.delete("/:Provincias_id", provinciasController.deleteProvincias);

router.get('/filtradas/:paisId', async (req, res) => {
    try {
      const localidades = await models.Provincia.findAll({
        where: {
            paisId: req.params.paisId,
        },
      });
  
      res.json(localidades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener localidades.' });
    }
  });


module.exports = router;