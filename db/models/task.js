'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskName: DataTypes.STRING,
    taskStatus: DataTypes.BOOLEAN,
    taskDate: DataTypes.DATE,
    taskNotes: DataTypes.TEXT,
    listId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.List, {
      foreignKey: 'listId'
    }),
    Task.hasMany(models.Subtask, {
      foreignKey: 'taskId'
    })
  };
  return Task;
};
