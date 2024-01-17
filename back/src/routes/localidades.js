
const express = require("express")
const { localidadesController } = require("../controllers");
const router = express.Router();
var models = require('../models');


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

// filtradas
router.get('/filtradas/:provinciaId', async (req, res) => {
    try {
      const localidades = await models.Localidad.findAll({
        where: {
          provinciaId: req.params.provinciaId,
        },
      });
  
      res.json(localidades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener localidades.' });
    }
  });


module.exports = router;