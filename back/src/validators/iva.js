const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
var models = require('../models');

// Validador para el pedido
const calcularIva = [

    check('pedido')
    .exists()
    .not()
    .isEmpty()
    .isArray()
    .custom(async (pedido, { req }) => {
        let subtotal = [];
      
        if (pedido.length === 1) {
          req.total = pedido[0].subtotal;
        } else {
          for (const element of pedido) {
            const pedidoEncontrado = await models.Pedidos.findByPk(element.id);
      
            if (!pedidoEncontrado) {
              throw new Error(`El pedido con ID ${element.id} no existe.`);
            }
      
            subtotal.push(pedidoEncontrado.subtotal);
          }
      
          const suma = subtotal.reduce((acumulador, numero) => acumulador + numero, 0);
          
          req.total = suma;
        }
      }),
    check('iva')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom(async (iva, { req }) => {
            
            req.totalIva = (req.total * iva) / 100;
            return true

        }),

    check('condicionIva')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('total')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),

    check('totalIva')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),

    check('tipo')
        .exists()
        .not()
        .isEmpty()
        .isString(),

        
    
    
   
        

    
    

];

module.exports = calcularIva;
