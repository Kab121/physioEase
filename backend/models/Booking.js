const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Booking = db.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  patient_name: {  // ✅ Must match your DB column
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctor_name: {  // ✅ Must match your DB column
    type: DataTypes.STRING,
    allowNull: false,
  },
  doctor_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  appointment_date: {  // ✅ Must match your DB column
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  appointment_time: {  // ✅ Must match your DB column
    type: DataTypes.STRING,
    allowNull: false,
  },
  session_type: {  // ✅ Must match your DB column
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "bookings",
  timestamps: false,
});

db.sync()
  .then(() => console.log("✅ Booking table ready"))
  .catch((err) => console.log("❌ Error creating booking table: " + err));

module.exports = Booking;
