'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Lists', [
      { listName: 'Home', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { listName: 'Work', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { listName: 'School', userId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Lists', null, {});
  }
};
