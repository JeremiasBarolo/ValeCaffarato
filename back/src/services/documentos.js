const { documentoProvider } = require('../providers');
var models = require('../models');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');


const listAllDocumento = async () => {
    return await documentoProvider.listAllDocumento();
};

const listOneDocumento = async (Documento_id) => {
    return await documentoProvider.listOneDocumento(Documento_id);
};

const createDocumento = async (documento) => {
    const pedidoEncontrado = await models.Pedidos.findByPk(documento.pedido);

    documento.total = pedidoEncontrado.subtotal
    documento.totalIva = (documento.total * documento.iva) / 100 + documento.total
    
    return await documentoProvider.createDocumento(documento);
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

