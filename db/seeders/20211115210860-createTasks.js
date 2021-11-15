'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Tasks', [{
        taskName: 'fakeTask',
        taskStatus: true,
        taskDate: new Date(),
        taskNotes: 'fakeNotes',
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),

      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Tasks', null, {});
  }
};
