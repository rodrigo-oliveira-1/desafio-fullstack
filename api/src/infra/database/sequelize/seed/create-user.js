'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const User = queryInterface.sequelize.define('users', {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
    }, { tableName: 'users', timestamps: false });

    // Verifica se já existem registros na tabela
    const usersCount = await User.count();

    if (usersCount === 0) {

      await queryInterface.bulkInsert('users', [
        {
          id: 'a4bfcc4e-fba9-45ac-930a-313f61d351e3',
          name: 'John Doe',
          email: 'jhon@doe.com',
          password: '$2a$12$YOZ.tTgCqsTy7brs7nYPUecL24prz.odA6GStYKg9x0EJ6QFaz4dy',//123456
          status: 'ACTIVE',
          cpf: '656.836.260-30',
          born_date: '2000-10-30',
          street: 'Street one',
          number: '1250',
          neighborhood: 'center',
          reference: 'near by hospital',
          city: 'Sao Paulo',
          state: 'SP',
          zip_code: 11222000,
          created_at: new Date(),
          created_by: null,
          updated_at: null,
          updated_by: null,
          deleted_at: null,
          deleted_by: null,
        },
      ])
    } else {
      console.log('No seed necessary.')
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { where: {id: 'a4bfcc4e-fba9-45ac-930a-313f61d351e3'} });
  }
};