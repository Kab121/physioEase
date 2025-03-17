import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="mb-4"><FaUserCircle className="me-2"/> Welcome, {user?.name}!</h1>
      <p>Manage your appointments, profile, and physiotherapy progress.</p>

      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h3><FaCalendarCheck className="me-2"/> My Appointments</h3>
            <p>View and manage your booked physiotherapy sessions.</p>
            <button className="btn btn-outline-primary">View Appointments</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h3><FaUserCircle className="me-2"/> Profile</h3>
            <p>Update your personal details and medical history.</p>
            <button className="btn btn-outline-success">Edit Profile</button>
          </div>
        </div>
      </div>

      <button className="btn btn-danger mt-4" onClick={logout}>
        <FaSignOutAlt className="me-2"/> Logout
      </button>
    </div>
  );
};

export default Dashboard;
