'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subtask = sequelize.define('Subtask', {
    subName: DataTypes.STRING,
    subStatus: DataTypes.BOOLEAN,
    subDate: DataTypes.DATE,
    subNotes: DataTypes.TEXT,
    taskId: DataTypes.INTEGER
  }, {});
  Subtask.associate = function(models) {
    Subtask.belongsTo(models.Task, {
      foreignKey: 'taskId'
    })
  };
  return Subtask;
};
