const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const transporter = require("../config/mailer");
require("dotenv").config();

// ✅ Email Sender Function
const sendConfirmationEmail = async (booking) => {
  const mailOptions = {
    from: `"PhysioEase" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "Appointment Confirmation",
    html: `
      <h2>Hello ${booking.patient_name},</h2>
      <p>Your appointment with <strong>${booking.doctor_name}</strong> is confirmed.</p>
      <ul>
        <li><strong>Date:</strong> ${booking.appointment_date}</li>
        <li><strong>Time:</strong> ${booking.appointment_time}</li>
        <li><strong>Session:</strong> ${booking.session_type}</li>
      </ul>
      <p>Thank you for choosing PhysioEase!</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    throw err; // This triggers the catch in /book
  }
};

// ✅ Create Booking
router.post("/book", async (req, res) => {
  try {
    const {
      patient_name,
      email,
      doctor_name,
      doctor_email,
      appointment_date,
      appointment_time,
      session_type,
    } = req.body;

    if (!patient_name || !email || !doctor_name || !doctor_email || !appointment_date || !appointment_time || !session_type) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBooking = await Booking.create({
      patient_name,
      email,
      doctor_name,
      doctor_email,
      appointment_date,
      appointment_time,
      session_type,
    });

    await sendConfirmationEmail(newBooking); // 🔔 Email after booking

    res.status(201).json({
      success: true,
      message: "Appointment booked!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking or Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// ✅ Get bookings by patient email
router.get("/by-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.findAll({ where: { email } });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Patient bookings fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get bookings by doctor name
router.get("/by-doctor/:doctorName", async (req, res) => {
  try {
    const doctorName = decodeURIComponent(req.params.doctorName);
    const bookings = await Booking.findAll({ where: { doctor_name: doctorName } });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Doctor (by name) bookings error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get bookings by doctor email
router.get("/by-doctor-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.findAll({ where: { doctor_email: email } });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Doctor (by email) bookings error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Update Booking
router.put("/edit/:id", async (req, res) => {
  try {
    const updated = await Booking.update(req.body, {
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "Booking updated", updated });
  } catch (err) {
    console.error("❌ Booking update error:", err);
    res.status(500).json({ success: false, message: "Error updating", error: err.message });
  }
});

// ✅ Delete Booking
router.delete("/delete/:id", async (req, res) => {
  try {
    await Booking.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    console.error("❌ Booking delete error:", err);
    res.status(500).json({ success: false, message: "Error deleting", error: err.message });
  }
});

module.exports = router;
