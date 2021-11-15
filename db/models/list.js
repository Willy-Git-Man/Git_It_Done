'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    taskName: DataTypes.STRING,
    taskStatus: DataTypes.BOOLEAN,
    taskDate: DataTypes.DATE,
    taskNotes: DataTypes.TEXT,
    listId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    List.hasMany(models.Task, {
      foreignKey: 'listId'
    })
  };
  return List;
};
