'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pais', [
      {
        id: 1,
        name: 'Argentina',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        
    ], {});

    await queryInterface.bulkInsert('Provincia', [
      {
        id: 1,
        name: 'Buenos Aires',
        paisId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Cordoba',
        paisId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        
    ], {});
    

    await queryInterface.bulkInsert('Localidads', [
      {
        name: 'Capital Federal',
        codigo_postal: 1499,
        provinciaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cordoba Capital',
        codigo_postal: 5000,
        provinciaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'General Deheza',
        codigo_postal: 5923,
        provinciaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'Las Perdices',
        codigo_postal: 5921,
        provinciaId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
        
    ], {});

    await queryInterface.bulkInsert('Tipo_Personas', [
      {
        description: 'Empleado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Proveedor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        description: 'Cliente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      
        
    ], {});

    await queryInterface.bulkInsert('Cond_Ivas', [
      {
        description: 'Excento',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    
    ], {});

    await queryInterface.bulkInsert('Monedas', [
      {
        description: 'Dolares',
        simbolo: '$',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Pesos Argentinos',
        simbolo: '$',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      
        
    ], {});

    await queryInterface.bulkInsert('Depositos', [
      {
        description: 'Deposito GD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        description: 'Deposito BS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      

      
        
    ], {});
 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
