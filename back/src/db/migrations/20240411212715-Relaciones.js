'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // <=============================== Pedidos ===============================> 
        await queryInterface.addColumn('Pedidos', 'monedaId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Monedas',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        });
    
        await queryInterface.addColumn('Pedidos', 'personaId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
              model: 'Personas',
              key: 'id',
            },
            onUpdate: 'CASCADE',
        });
    // <=============================== Fin Pedidos ===============================> 

    // <=============================== Producto en Stock ===============================> 
    await queryInterface.addColumn('ProductosEnStock', 'depositoId', {
      type: Sequelize.INTEGER,
        references:{
          model: 'Depositos',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn('ProductosEnStock', 'uni_medida', {
      type: Sequelize.INTEGER,
        references:{
          model: 'UnidadesDeMedidas',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

   
// <=============================== Fin Producto en Stock ===============================> 


// <=============================== Provincias ===============================> 
    await queryInterface.addColumn('Provincia', 'paisId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model: 'Pais',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });


    // <=============================== Fin Provincias ===============================> 


    // <=============================== Localidad ===============================> 
    await queryInterface.addColumn('Localidads', 'provinciaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model: 'Provincia',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });


    // <=============================== Fin Localidad ===============================> 


    // <=============================== Bancos ===============================> 
    await queryInterface.addColumn('Bancos', 'localidadId', {
      type: Sequelize.INTEGER,
            allowNull: true,
            references:{
              model: 'Localidads',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
    });


    // <=============================== Fin Bancos ===============================> 


    // <=============================== Documentos ===============================> 
    await queryInterface.addColumn('Documentos', 'pedidoId', {
      type: Sequelize.INTEGER,
            allowNull: true,
            references:{
              model: 'Pedidos',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
    });


    // <=============================== Fin Documentos ===============================> 


    // <=============================== Personas ===============================> 
    await queryInterface.addColumn('Personas', 'CondIvaId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Cond_Ivas',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('Personas', 'TipoPersonaId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Tipo_Personas',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('Personas', 'documentoId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Documentos',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('Personas', 'localidadId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Localidads',
        key: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });


    // <=============================== Fin Personas ===============================> 


    // <=============================== Maestro de Articulos ===============================> 
    await queryInterface.addColumn('MaestroDeArticulos', 'pedidoId', {
      type: Sequelize.INTEGER,
            references:{
              model: 'Pedidos',
              key: 'id',
              onDelete: 'CASCADE'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn('MaestroDeArticulos', 'documentoId', {
      type: Sequelize.INTEGER,
            references:{
              model: 'Documentos',
              key: 'id',
              onDelete: 'CASCADE'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn('MaestroDeArticulos', 'uni_medida', {
      type: Sequelize.INTEGER,
        references:{
          model: 'UnidadesDeMedidas',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });


    // <=============================== Fin Maestro de Articulos ===============================> 


// <============================================================ Tablas Intermedias =============================================================>


// <=============================== Pedidos Productos ===============================> 
    await queryInterface.addColumn('PedidosProductos', 'pedidoId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Pedidos',
        key: 'id',
        onDelete: 'SET NULL'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('PedidosProductos', 'productId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'MaestroDeArticulos',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
// <=============================== Fin Pedidos Productos ===============================> 


// <=============================== PersonasDocumentos ===============================> 
    await queryInterface.addColumn('PersonaDocumentos', 'personaId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Personas',
        key: 'id',
        onDelete: 'SET NULL'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('PersonaDocumentos', 'documentoId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Documentos',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
// <=============================== Fin PersonasDocumentos ===============================> 


// <=============================== ProductQuantitites ===============================> 
      await queryInterface.addColumn('ProductQuantities', 'entidadId', {
        type: Sequelize.INTEGER,
        references:{
          model: 'MaestroDeArticulos',
          key: 'id',
          onDelete: 'SET NULL'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

      });

      await queryInterface.addColumn('ProductQuantities', 'productoId', {
        type: Sequelize.INTEGER,
        references:{
          model: 'ProductosEnStock',
          key: 'id',
          onDelete: 'CASCADE'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

      });
// <=============================== Fin ProductQuantitites ===============================> 


// <=============================== PedidoDocumentos ===============================> 
    await queryInterface.addColumn('PedidoDocumentos', 'pedidoId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Pedidos',
        key: 'id',
        onDelete: 'SET NULL'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('PedidoDocumentos', 'documentoId', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Documentos',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
// <=============================== Fin PedidoDocumentos ===============================> 

    
  },
    
  down: async (queryInterface, Sequelize) => {
        // <=============================== Pedidos ===============================> 
    await queryInterface.removeColumn('Pedidos', 'monedaId');
    await queryInterface.removeColumn('Pedidos', 'personaId');
    
    // <=============================== Producto en Stock ===============================> 
    await queryInterface.removeColumn('ProductosEnStock', 'depositoId');
    
    // <=============================== Provincias ===============================> 
    await queryInterface.removeColumn('Provincia', 'paisId');
    
    // <=============================== Localidad ===============================> 
    await queryInterface.removeColumn('Localidads', 'provinciaId');
    
    // <=============================== Bancos ===============================> 
    await queryInterface.removeColumn('Bancos', 'localidadId');
    
    // <=============================== Documentos ===============================> 
    await queryInterface.removeColumn('Documentos', 'pedidoId');
    
    // <=============================== Personas ===============================> 
    await queryInterface.removeColumn('Personas', 'CondIvaId');
    await queryInterface.removeColumn('Personas', 'TipoPersonaId');
    await queryInterface.removeColumn('Personas', 'documentoId');
    await queryInterface.removeColumn('Personas', 'localidadId');
    
    // <=============================== Maestro de Articulos ===============================> 
    await queryInterface.removeColumn('MaestroDeArticulos', 'pedidoId');
    await queryInterface.removeColumn('MaestroDeArticulos', 'documentoId');

     // <=============================== Pedidos Productos ===============================> 
     await queryInterface.removeColumn('PedidosProductos', 'pedidoId');
     await queryInterface.removeColumn('PedidosProductos', 'productId');
 
 
     // <=============================== ProductQuantitites ===============================> 
     await queryInterface.removeColumn('ProductQuantities', 'entidadId');
     await queryInterface.removeColumn('ProductQuantities', 'productoId');
 
     // <=============================== PedidoDocumentos ===============================> 
     await queryInterface.removeColumn('PedidoDocumentos', 'pedidoId');
     await queryInterface.removeColumn('PedidoDocumentos', 'documentoId');
   
  }
    
        
    
    
}

