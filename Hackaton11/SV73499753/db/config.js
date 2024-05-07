const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.database,
  process.env.database_username,
  process.env.database_password,
  {
    host: process.env.database_host, // for heroku
    dialect: "mysql",
  }
)

module.exports = sequelize;