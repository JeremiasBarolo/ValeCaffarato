var models = require('../models');


const listAllCantidades= async (req, res) => {
  try {
    const Cantidades= await models.InsumosEntities.findAll({
      include: { all: true },
    })
    res.json(Cantidades);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};





module.exports = {
  listAllCantidades
};
