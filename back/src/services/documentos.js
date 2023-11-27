const { documentoProvider } = require('../providers');

const listAllDocumento = async () => {
    return await documentoProvider.listAllDocumento();
};

const listOneDocumento = async (Documento_id) => {
    return await documentoProvider.listOneDocumento(Documento_id);
};

const createDocumento = async (DocumentoData) => {
    return await documentoProvider.createDocumento(DocumentoData);
};


const updateDocumento = async (Documento_id, updateDocumento) => {
    return await documentoProvider.updateDocumento(Documento_id, updateDocumento);
};

const deleteDocumento = async (Documento_id) => {
    return await documentoProvider.deleteDocumento(Documento_id);
};


module.exports = {
 listAllDocumento, listOneDocumento, createDocumento, updateDocumento, deleteDocumento, 
};
