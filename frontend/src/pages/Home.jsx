import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDumbbell, FaChartLine, FaClock, FaFileMedical, FaComments, FaHospital } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const Home = () => {
  return (
    <div>
      {/* ✅ Hero Section */}
      <motion.section className="hero-section text-center">
        <div className="overlay"></div>
        <div className="container position-relative text-white">
          <motion.h1 className="display-4 fw-bold" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
            Welcome to PhysioEase
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            Your Trusted Physiotherapy Solution for Recovery & Wellness
          </motion.p>
          <motion.div className="mt-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ✅ Features Section */}
      <section className="container text-center py-5">
        <h2 className="fw-bold mb-3">Why Choose PhysioEase?</h2>
        <p className="text-muted mb-5">Experience expert-designed programs tailored to your recovery needs.</p>
        <div className="row g-4">
          <div className="col-md-4"><FaClock size={50} className="text-primary" /><h4>24/7 Access</h4></div>
          <div className="col-md-4"><FaDumbbell size={50} className="text-success" /><h4>Personalized Exercises</h4></div>
          <div className="col-md-4"><FaChartLine size={50} className="text-warning" /><h4>Progress Tracking</h4></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
