'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subtasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subName: {
        type: Sequelize.STRING
      },
      subStatus: {
        type: Sequelize.BOOLEAN
      },
      subDate: {
        type: Sequelize.DATE
      },
      subNotes: {
        type: Sequelize.TEXT
      },
      taskId: {
        type: Sequelize.INTEGER
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Subtasks');
  }
};