const { Sequelize } = require("sequelize");

const db = new Sequelize("physioease", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,  // ✅ Log all SQL queries
});

db.authenticate()
  .then(() => console.log("✅ MySQL Connected"))
  .catch(err => console.error("❌ MySQL Connection Error:", err));

module.exports = db;
