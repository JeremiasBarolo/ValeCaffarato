const { documentoService } = require("../services");


const listAllDocumento = async (req, res) => {
  try {
    const Documento = await documentoService.listAllDocumento();
    res.json(Documento);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneDocumento = async (req, res) => {
  try {
    const id = req.params.Documento_id;
    const Documento = await documentoService.listOneDocumento(id);
    res.json(Documento);

  } catch (err) {
    res.status(500).json({ action: "listOneDocumento", error: err.message });
  }

};

const createDocumento = async (req, res) => {

  try {
    const newDocumento = await documentoService.createDocumento(req.body);

    console.log(`✅ Documento "${newDocumento.name}" was created  `);
    res.json(newDocumento);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Documento.' });
  }
};

const updateDocumento = async (req, res) => {

  try {
    const DocumentoUpdate = await documentoService.updateDocumento(req.params.Documento_id, req.body);
    res.json(DocumentoUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateDocumento', error: err.message });
  }
};

const deleteDocumento = async (req, res) => {
  const id = req.params.Documento_id;
  try {
    await documentoService.deleteDocumento(id);
    res.json({ message: `✅  Documento with the id: ${id} was  deleted successfully` });
  } catch (err) {
    res.status(500).json({ action: 'deleteDocumento', error: err.message });
  }
};



module.exports = {
  listAllDocumento, listOneDocumento, createDocumento, updateDocumento, deleteDocumento, 
};
