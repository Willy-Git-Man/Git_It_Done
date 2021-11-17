'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [{
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      hashedPassword: '$2a$10$0rD8s.E/am2yyeMW1540O.nJcv2fCqUjRlmIeCRLsFAkzACQKcUSS',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
