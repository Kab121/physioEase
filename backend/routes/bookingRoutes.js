const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// ✅ Route to create a new booking
router.post("/book", async (req, res) => {
  try {
    console.log("🔹 Received Request Body:", req.body);

    const {
      patient_name,
      email,
      doctor_name,
      doctor_email,
      appointment_date,
      appointment_time,
      session_type,
    } = req.body;

    // ✅ Validation
    if (
      !patient_name ||
      !email ||
      !doctor_name ||
      !doctor_email ||
      !appointment_date ||
      !appointment_time ||
      !session_type
    ) {
      console.error("❌ Missing required fields:", req.body);
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Insert into DB
    const newBooking = await Booking.create({
      patient_name,
      email,
      doctor_name,
      doctor_email, // ✅ Save doctor email
      appointment_date,
      appointment_time,
      session_type,
    });

    console.log("✅ Booking successful:", newBooking);
    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// ✅ Route to get bookings by patient email
router.get("/by-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.findAll({ where: { email } });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching patient bookings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Route to get bookings by doctor name (optional support)
router.get("/by-doctor/:doctorName", async (req, res) => {
  try {
    const doctorName = decodeURIComponent(req.params.doctorName);
    const bookings = await Booking.findAll({ where: { doctor_name: doctorName } });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching doctor bookings by name:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Route to get bookings by doctor email (used in profile)
router.get("/by-doctor-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.findAll({ where: { doctor_email: email } });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching doctor bookings by email:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
