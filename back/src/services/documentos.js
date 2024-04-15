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



const generarPdf = async (documento) => {
    const generarPdf = async (documento) => {
        const templatePath = path.join(__dirname, '../assets/index.html');
        const templateContent = fs.readFileSync(templatePath, 'utf-8');

        let cliente ={
            industry: 'documento.clienteData.industry',
            city: 'documento.clienteData.city'
        }
        
        let tipoDocumento
        let documentosPath
        if(documento.documento.tipo === 'REMITO'){
            tipoDocumento = 'Remito'
            documentosPath = path.join(__dirname, `../../../documentos/remitos/${documento.documento.tipo}${documento.clienteData.name}-${documento.documento.id}.pdf`);
        }else{
            tipoDocumento = 'Factura'
            documentosPath = path.join(__dirname, `../../../documentos/facturas/${documento.documento.tipo}${documento.clienteData.name}-${documento.documento.id}.pdf`);
        }    



    
        const productosHTML = documento.productData.map((productList) => {
            return productList.map((item) => {

                console.log('Nombre del producto:', item.name);
        console.log('Cantidad solicitada:', item.PedidosProductos.quantity_requested);
                return `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.PedidosProductos.quantity_requested}</td>
                        <td>$${item.costo_unit}</td>
                        <td>$${calcularTotal(item.costo_unit, item.PedidosProductos.quantity_requested)}</td>
                        <td>${documento.documento.iva}%</td>
                        <td>$${totalIva(item.costo_unit, item.PedidosProductos.quantity_requested, documento.documento.iva)}</td>
                    </tr>
                `;
            }).join('');
        }).join('');

        
        
        
        const facturaHTML = templateContent
            .replace('{{documento.id}}', documento.documento.id)
            .replace('{{documento.createdAt}}', documento.documento.createdAt)
            .replace('{{clienteData.name}}', documento.clienteData.name)
            .replace('{{clienteData.lastname}}', documento.clienteData.lastname)
            .replace('{{clienteData.dni}}', documento.clienteData.dni)
            .replace('{{clienteData.cuil}}', documento.clienteData.cuil)
            .replace('{{clienteData.industry}}', cliente.industry)
            .replace('{{documento.type}}', tipoDocumento)
            .replace('{{clienteData.city}}', cliente.city)
            .replace('{{clienteData.adress}}', documento.clienteData.adress)
            .replace('{{clienteData.adress_number}}', documento.clienteData.adress_number)
            .replace('{{clienteData.phone}}', documento.clienteData.phone)
            .replace('{{clienteData.email}}', documento.clienteData.email)
            .replace('{{subtotalReal}}', documento.subtotal)
            .replace('{{subtotalFinal}}', documento.subtotal)
            .replace('{{productosHTML}}', productosHTML)
            .replace( '{{clienteData.Localidad.name}}', documento.clienteData.Localidad.name)
            .replace( '{{clienteData.Localidad.codigo_postal}}', documento.clienteData.Localidad.codigo_postal)
            .replace( '{{clienteData.Condicion_Iva.description}}', documento.clienteData.Condicion_Iva.description)


    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        
        await page.setContent(facturaHTML);
    
        
        
        await page.pdf({ path: documentosPath, format: 'A4' });
    
        await browser.close();
    
        return console.log('PDF generado');
    };
    
    
    generarPdf(documento).then((pdfPath) => {
        console.log(`PDF generado en: ${pdfPath}`);
    }).catch((error) => {
        console.error(`Error al generar el PDF: ${error}`);
    });
}








module.exports = {
    listAllDocumento, listOneDocumento, createDocumento, updateDocumento, deleteDocumento, generarPdf
};

function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

// Función para calcular el total con IVA
function totalIva(precio, cantidad, iva) {
    const total = calcularTotal(precio, cantidad);
    const totalConIva = (total * iva) / 100 + total;
    return totalConIva;
}

// Función para calcular el subtotal real
function subtotalReal(productData, documento) {
    const subtotales = [];

    productData.forEach((productList) => {
        productList.forEach((item) => {
            const iva = documento.iva || 0;
            const subtotal = totalIva(item.costo_unit, item.PedidosProductos.quantity_requested, iva);
            subtotales.push(subtotal);
        });
    });

    const suma = subtotales.reduce((acumulador, numero) => acumulador + numero, 0);
    return suma;
}