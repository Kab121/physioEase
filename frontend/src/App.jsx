import { Routes, Route, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Services from "./pages/Services";
import Treatments from "./pages/Treatments";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import logo from "./assets/logo.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { FaHome, FaUserMd, FaClipboardList, FaNewspaper, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

// ✅ Protected Route for Authenticated Users
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// ✅ Navbar Component
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <motion.nav 
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="PhysioEase Logo" className="logo me-2" />
          <span className="fw-bold text-primary">PHYSIOEASE</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link" to="/"><FaHome className="me-1"/> Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/features"><FaClipboardList className="me-1"/> Features</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services"><FaUserMd className="me-1"/> Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/treatments"><FaUserMd className="me-1"/> Treatments</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/news"><FaNewspaper className="me-1"/> News & Advice</Link></li>
          </ul>
          <div>
            {user ? (
              <button className="btn btn-danger" onClick={logout}>
                <FaSignOutAlt className="me-1"/> Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2"><FaSignInAlt className="me-1"/> Login</Link>
                <Link to="/register" className="btn btn-primary"><FaUserPlus className="me-1"/> Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

// ✅ Footer Component
function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <img src={logo} alt="PhysioEase Logo" className="footer-logo mb-3" />
        <p>Empowering your physiotherapy journey.</p>
        <div className="social-icons">
          <a href="#" className="text-white mx-2"><FaFacebook size={24} /></a>
          <a href="#" className="text-white mx-2"><FaTwitter size={24} /></a>
          <a href="#" className="text-white mx-2"><FaInstagram size={24} /></a>
          <a href="mailto:info@physioease.com" className="text-white mx-2"><FaEnvelope size={24} /></a>
        </div>
        <p className="mt-3">&copy; 2024 PhysioEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ✅ Main App Component
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/services" element={<Services />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* ✅ Allow booking page to be accessed without login */}
        <Route path="/booking" element={<Booking />} /> 

        <Route path="*" element={<Navigate to="/" />} />  {/* Redirect to Home if page not found */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
