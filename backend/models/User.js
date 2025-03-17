const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { 
  tableName: "users", // ✅ Ensure correct table name
  timestamps: false   // ✅ Disable createdAt & updatedAt
});

db.sync()
  .then(() => console.log("✅ User table ready"))
  .catch((err) => console.log("❌ Error creating table: " + err));

module.exports = User;
