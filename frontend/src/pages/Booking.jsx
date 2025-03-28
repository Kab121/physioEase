import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserMd,
  FaUser,
  FaNotesMedical,
} from "react-icons/fa";
import "../styles.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doctorName = location.state?.doctor || "";

  const timeSlots = {
    "Dr. Emily Carter": ["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM"],
    "Dr. James Anderson": ["08:00 AM", "11:00 AM", "02:30 PM", "05:00 PM"],
    "Dr. Afsana Aktar": ["10:00 AM", "12:30 PM", "03:30 PM", "06:00 PM"],
    "Dr. Liam Wilson": ["07:30 AM", "09:45 AM", "01:15 PM", "04:45 PM"],
  };

  // ✅ Get doctor email based on name
  const getDoctorEmail = (name) => {
    const mapping = {
      "Dr. James Anderson": "james@gmail.com",
      "Dr. Emily Carter": "emily@hotmail.com",
      "Dr. Afsana Aktar": "afsana@live.com",
      "Dr. Liam Wilson": "liam@yahoo.com",
    };
    return mapping[name] || "";
  };

  const [formData, setFormData] = useState({
    patient_name: "",
    email: "",
    doctor_name: doctorName,
    appointment_date: "",
    appointment_time: "",
    session_type: "Consultation",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Final fixed submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const completeData = {
      ...formData,
      doctor_email: getDoctorEmail(formData.doctor_name),
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Appointment booked successfully!");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Server Error:", error);
      setMessage("❌ Server Error. Please try again later.");
    }
  };

  return (
    <div className="booking-container">
      <motion.div
        className="booking-form shadow-lg p-4 bg-white rounded"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center fw-bold mb-3">
          <FaCalendarAlt className="text-primary me-2" /> Book an Appointment
        </h2>
        <p className="text-center text-muted">
          Choose your preferred time and doctor for a consultation.
        </p>

        {message && <p className="text-center alert alert-info">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span className="input-group-text"><FaUser /></span>
            <input
              type="text"
              className="form-control"
              name="patient_name"
              placeholder="Your Name"
              value={formData.patient_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaNotesMedical /></span>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaUserMd /></span>
            <input
              type="text"
              className="form-control"
              name="doctor_name"
              value={formData.doctor_name}
              readOnly
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text"><FaCalendarAlt /></span>
            <input
              type="date"
              className="form-control"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Available Time Slots</label>
            <select
              className="form-select"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              {timeSlots[formData.doctor_name]?.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Session Type</label>
            <select
              className="form-select"
              name="session_type"
              value={formData.session_type}
              onChange={handleChange}
              required
            >
              <option value="Consultation">Consultation</option>
              <option value="Therapy Session">Therapy Session</option>
              <option value="Follow-up Visit">Follow-up Visit</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Confirm Appointment
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;
