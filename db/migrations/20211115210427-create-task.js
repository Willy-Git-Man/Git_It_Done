
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      taskName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskStatus: {
        default:false,
        type: Sequelize.BOOLEAN
      },
      taskDate: {
        type: Sequelize.DATE
      },
      taskNotes: {
        type: Sequelize.TEXT
      },
      listId: {
        type: Sequelize.INTEGER,
        references: { model: 'Lists' }
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
    return queryInterface.dropTable('Tasks');
  }
};
