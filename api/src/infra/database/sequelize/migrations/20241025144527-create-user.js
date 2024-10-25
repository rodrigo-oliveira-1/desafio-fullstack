'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true  
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_DATE')
      },
      createdBy: {
        type: Sequelize.UUID,
        field: 'created_by' 
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_DATE')
      },
      updatedBy: {
        type: Sequelize.UUID,
        field: 'updated_by' 
      },
      deletedAt: {
        type: Sequelize.DATE,
        field: 'deleted_at',
        defaultValue: Sequelize.literal('CURRENT_DATE')
      },
      deletedBy: {
        type: Sequelize.UUID,
        field: 'deleted_by' 
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      bornDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        field: 'born_date'
      },
      street: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      number: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING(60),
        allowNull: false
      }, 
      reference: {
        type: Sequelize.STRING(60)
      },
      city: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      zipCode: {
        type: Sequelize.INTEGER,
        field: 'zip_code'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};