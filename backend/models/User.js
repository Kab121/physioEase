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
  role: {                      // ✅ New field for role-based access
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "patient",   // default role if not doctor
  },
}, { 
  tableName: "users",
  timestamps: false
});

// ✅ Sync table
db.sync()
  .then(() => console.log("✅ User table ready"))
  .catch((err) => console.log("❌ Error creating table: " + err));

module.exports = User;
