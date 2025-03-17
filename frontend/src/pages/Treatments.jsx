import { FaStar, FaUserMd, FaMedal, FaClinicMedical, FaBriefcase, FaCertificate, FaHospitalUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../styles.css";

const Treatments = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  // ✅ Allow direct navigation to booking page
  const handleBookAppointment = (doctorName) => {
    console.log("🔹 Redirecting to /booking for:", doctorName);
    navigate("/booking", { state: { doctor: doctorName } }); // ✅ Always navigate
  };

  const therapists = [
    { id: 1, name: "Dr. Emily Carter", specialty: "Sports Physiotherapy", degree: "PhD in Physiotherapy", rating: 4.9, icon: <FaUserMd size={32} className="text-primary" /> },
    { id: 2, name: "Dr. James Anderson", specialty: "Rehabilitation Therapy", degree: "MSc in Rehabilitation Science", rating: 4.8, icon: <FaMedal size={32} className="text-success" /> },
    { id: 3, name: "Dr. Afsana Aktar", specialty: "Geriatric Physiotherapy", degree: "Doctor of Physical Therapy (DPT)", rating: 4.7, icon: <FaClinicMedical size={32} className="text-warning" /> },
    { id: 4, name: "Dr. Liam Wilson", specialty: "Neurological Physiotherapy", degree: "MSc in Neuro Physiotherapy", rating: 4.9, icon: <FaUserMd size={32} className="text-danger" /> },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Meet Our <span className="text-primary">Expert Physiotherapists</span></h2>
      <p className="text-center mb-5">Our specialists provide world-class physiotherapy treatments to help you recover effectively.</p>

      <div className="row">
        {therapists.map((therapist) => (
          <motion.div 
            key={therapist.id} 
            className="col-md-6 mb-4"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="therapist-card shadow p-4 rounded text-center">
              <div className="therapist-icon">{therapist.icon}</div>
              <h5 className="card-title mt-3">{therapist.name}</h5>
              <p className="card-text"><FaBriefcase className="text-muted me-2" /> <strong>Specialty:</strong> {therapist.specialty}</p>
              <p className="card-text"><FaCertificate className="text-muted me-2" /> <strong>Degree:</strong> {therapist.degree}</p>
              <p className="card-text">
                <FaStar className="text-warning me-1" /> 
                <strong>Rating:</strong> {therapist.rating}
              </p>
              <button 
                className="btn btn-primary mt-3" 
                onClick={() => handleBookAppointment(therapist.name)} // ✅ Redirects to booking
              >
                Book Appointment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Treatments;
