const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cards_db", "postgres", "superuser", {
  host: "db",
  dialect: "postgres",
});

module.exports = { sequelize };
