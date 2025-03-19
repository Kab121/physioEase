const express = require("express");
const router = express.Router();  // ✅ Define router
const Booking = require("../models/Booking");

// ✅ Route to create a new booking
router.post("/book", async (req, res) => {
    try {
        console.log("🔹 Received Request Body:", req.body);

        const { patient_name, email, doctor_name, appointment_date, appointment_time, session_type } = req.body;

        if (!patient_name || !email || !doctor_name || !appointment_date || !appointment_time || !session_type) {
            console.error("❌ Missing required fields:", req.body);
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Insert into database
        const newBooking = await Booking.create({
            patient_name,
            email,
            doctor_name,
            appointment_date,
            appointment_time,
            session_type,
        });

        console.log("✅ Booking successful:", newBooking);
        res.status(201).json({ success: true, message: "Appointment booked successfully!", booking: newBooking });

    } catch (error) {
        console.error("❌ Booking Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});

// ✅ Export router
module.exports = router;
