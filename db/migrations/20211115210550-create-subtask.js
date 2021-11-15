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
        allowNull: false,
        type: Sequelize.STRING
      },
      subStatus: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      subDate: {
        type: Sequelize.DATE
      },
      subNotes: {
        type: Sequelize.TEXT
      },
      taskId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tasks' }
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
