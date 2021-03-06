'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    listName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    List.hasMany(models.Task, {
      foreignKey: 'listId',
      onDelete: 'CASCADE',
      hooks: true
    }),
    List.belongsTo(models.User, {
      foreignKey: 'userId'
    })

  };
  return List;
};
