const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
var models = require('../models');

// Validador para el pedido
const pedidoValidator = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('description')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('category')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('state')
        .exists()
        .not()
        .isEmpty()
        .isString(),

    check('subtotal')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    
    
    check('productos')
        .exists()
        .not()
        .isEmpty()
        .isArray()
        .custom(async (productos, { req }) => {
            const errors = [];
        
            for (const product of productos) {
              try {
                const productEntity = await models.MaestroDeArticulos.findByPk(product.id, {
                  include: { all: true },
                });
        
                if (productEntity) {
                  for (const insumo of productEntity.ProductosEnStocks) {
                    const totalNecesario = insumo.ProductQuantities.quantity_necessary * product.cantidad;
                    if (totalNecesario > insumo.quantity) {
                      errors.push(`El insumo ${insumo.name} no tiene suficiente stock.`);
                    }
                  }
                } else {
                  errors.push(`El insumo con ID ${product.id} no existe.`);
                }
              } catch (error) {
                errors.push(`Error al procesar el insumo con ID ${product.id}: ${error.message}`);
              }
            }
        
            if (errors.length > 0) {
              throw new Error(errors.join(' , '));
            }
        
            return true;
          }),
        (req, res, next) => {
            validateResult(req, res, next)
        }

    
    
];

module.exports = pedidoValidator;

