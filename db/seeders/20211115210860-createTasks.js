'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Tasks', [
        { taskName: 'Buy Milk', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes',  listId: 1, createdAt: new Date(), updatedAt: new Date() },
        { taskName: 'Clean Room', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes', listId: 1, createdAt: new Date(), updatedAt: new Date()},
        { taskName: 'Mow Lawn', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes',listId: 1, createdAt: new Date(), updatedAt: new Date() },
        { taskName: 'Work Project 1', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes', listId: 2, createdAt: new Date(), updatedAt: new Date() },
        { taskName: 'Talk to Karen', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes', listId: 2, createdAt: new Date(), updatedAt: new Date() },
        { taskName: 'Buy School Supplies', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes', listId: 3, createdAt: new Date(), updatedAt: new Date() },
        { taskName: 'Make Lunch', taskStatus: false, taskDate: new Date(), taskNotes: 'fakeNotes',listId: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
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
