'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Subtasks', [
        { subName: 'Sub Task 1', subStatus: false, subDate: new Date(), subNotes: 'fakeNotes', taskId: 4, createdAt: new Date(), updatedAt: new Date() },
        { subName: 'Sub Task 2', subStatus: false, subDate: new Date(), subNotes: 'fakeNotes', taskId: 4, createdAt: new Date(), updatedAt: new Date() },
        { subName: 'Sub Task 3', subStatus: false, subDate: new Date(), subNotes: 'fakeNotes', taskId: 4, createdAt: new Date(), updatedAt: new Date() }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Subtasks', null, {});
  }
};
