import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100 bg-light pt-5">

      {success && <Confetti />}
      <motion.div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4">Register</h2>

        {success ? (
          <div className="alert alert-success text-center fw-semibold fs-5">
            🎉 Registration successful! Redirecting to login...
          </div>
        ) : (
          <>
            <div className="mb-3 position-relative">
              <FaUser className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3 position-relative">
              <FaEnvelope className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
              <input
                type="email"
                className="form-control ps-5"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4 position-relative">
              <FaLock className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
              <input
                type="password"
                className="form-control ps-5"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-success w-100 fw-bold"
              onClick={handleRegister}
            >
              Register
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
