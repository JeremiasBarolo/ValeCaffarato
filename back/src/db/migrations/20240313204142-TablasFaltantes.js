'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Recibo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro_recibo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Cheques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo_cheque: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      num_serie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha_emi: {
        type: Sequelize.DATE,
      },
      fecha_pago: {
        type: Sequelize.DATE,
      },
      monto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Forma_Pago', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc_forma_pago: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Detalle_doc_com', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_documento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Remitos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_ven: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cond_venta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Facturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cond_venta: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      num_facturas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_emi: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      iva_porc: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      iva_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_neto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_otros_tri: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cae: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_ven_cae: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Notacd', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cond_venta: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tipo_nota: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_emi: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      iva_porc: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      iva_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_neto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_otros_tri: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      importe_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cae: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_ven_cae: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Movimientos_Stock', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nro_doc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tipo_doc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_mov_stock: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uni_medida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    await queryInterface.createTable('tipo_de_articulos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Reclamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      detalle_reclamo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('Tipo_Reclamo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc_reclamo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // <================================================================== Relaciones =====================================================================>
    await queryInterface.addColumn('Reclamos', 'id_tipo_reclamo', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Tipo_Reclamo',
        key: 'id',
        onDelete: 'SET NULL'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('Facturas', 'id_datalle', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Detalle_doc_com',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Facturas', 'id_persona', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Personas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Facturas', 'id_forma_pago', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Forma_Pago',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('Notacd', 'id_datalle', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Detalle_doc_com',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Notacd', 'id_persona', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Personas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Notacd', 'id_forma_pago', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Forma_pago',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('Cheques', 'id_banco', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Bancos',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Cheques', 'id_persona', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Personas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('Recibo', 'id_detalle', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Detalle_doc_com',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Recibo', 'id_persona', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Personas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Recibo', 'id_forma_pago', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Forma_Pago',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Recibo', 'id_moneda', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Monedas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });

    await queryInterface.addColumn('Remitos', 'id_detalle', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Detalle_doc_com',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Remitos', 'id_persona', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Personas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    await queryInterface.addColumn('Remitos', 'id_facturas', {
      type: Sequelize.INTEGER,
      references:{
        model: 'Facturas',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });


    await queryInterface.addColumn('Movimientos_Stock', 'id_articulo', {
      type: Sequelize.INTEGER,
      references:{
        model: 'MaestroDeArticulos',
        key: 'id',
        onDelete: 'CASCADE'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
