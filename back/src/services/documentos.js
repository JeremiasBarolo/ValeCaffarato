const { documentoProvider } = require('../providers');
var models = require('../models');


const listAllDocumento = async () => {
    return await documentoProvider.listAllDocumento();
};

const listOneDocumento = async (Documento_id) => {
    return await documentoProvider.listOneDocumento(Documento_id);
};

const createDocumento = async (DocumentoData) => {

    const subtotal = [];
    if (DocumentoData.pedido.length === 1) {
        const pedidoEncontrado = await models.Pedidos.findByPk(DocumentoData.pedido[0].id);

        DocumentoData.total = pedidoEncontrado.subtotal
        DocumentoData.totalIva = (DocumentoData.total * DocumentoData.iva) / 100 + DocumentoData.total
    } 
    else {
        for (const element of DocumentoData.pedido) {
            const pedidoEncontrado = await models.Pedidos.findByPk(element.id);
      
            if (!pedidoEncontrado) {
              throw new Error(`El pedido con ID ${element.id} no existe.`);
            }
      
            subtotal.push(pedidoEncontrado.subtotal);
        }

        DocumentoData.total= subtotal.reduce((acumulador, numero) => acumulador + numero, 0);
        DocumentoData.totalIva = (DocumentoData.total * DocumentoData.iva) / 100 + DocumentoData.total
        
        }
      
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