const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    // logging: false,
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
