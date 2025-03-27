import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    const endpoint =
      user.role === "doctor"
        ? `http://localhost:5000/api/bookings/by-doctor-email/${user.email}`
        : `http://localhost:5000/api/bookings/by-email/${user.email}`;

    const fetchBookings = async () => {
      try {
        const res = await axios.get(endpoint);
        setBookings(res.data);
      } catch (err) {
        console.error("❌ Booking fetch error:", err);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4"><FaUser className="me-2" />User Profile</h2>

      <div className="card mb-4 p-3">
        <h5><strong>Name:</strong> {user?.name}</h5>
        <h5><strong>Email:</strong> {user?.email}</h5>
        <h5><strong>Role:</strong> {user?.role}</h5>
      </div>

      <h3 className="mb-3">
        <FaCalendarAlt className="me-2" />
        {user?.role === "doctor" ? "All Appointments" : "My Appointments"}
      </h3>

      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="card mb-3 p-3 shadow-sm">
            <p><strong>Patient:</strong> {booking.patient_name}</p>
            <p><strong>Doctor:</strong> {booking.doctor_name}</p>
            <p><strong>Date:</strong> {booking.appointment_date}</p>
            <p><strong>Time:</strong> {booking.appointment_time}</p>
            <p><strong>Session:</strong> {booking.session_type}</p>
          </div>
        ))
      ) : (
        <div className="alert alert-warning">No appointments found.</div>
      )}
    </div>
  );
};

export default Profile;
