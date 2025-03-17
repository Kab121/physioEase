import { FaClock, FaDumbbell, FaChartLine, FaFileMedical, FaComments, FaHospital } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const Features = () => {
  return (
    <div className="container text-center py-5">
      <h2 className="fw-bold mb-3">Benefits of the PhysioEase App</h2>
      <p className="text-muted mb-5">
        A sophisticated online physiotherapy management system, safeguarded by expert physiotherapists.
      </p>

      <div className="row g-4">
        {/* Feature 1 */}
        <div className="col-md-4">
          <div className="feature-card">
            <FaClock size={50} className="feature-icon text-primary" />
            <h4 className="fw-bold mt-3">24/7, Free Access for All</h4>
            <p className="text-muted">
              Access physiotherapy programs anytime through our web platform or mobile app on your phone or tablet.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-md-4">
          <div className="feature-card">
            <FaDumbbell size={50} className="feature-icon text-success" />
            <h4 className="fw-bold mt-3">Online Exercise Resources</h4>
            <p className="text-muted">
              Our physiotherapists guide you through customized exercises with video tutorials and consultation options.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-md-4">
          <div className="feature-card">
            <FaChartLine size={50} className="feature-icon text-warning" />
            <h4 className="fw-bold mt-3">Progress Tracking Tools</h4>
            <p className="text-muted">
              Monitor your rehabilitation progress with our advanced tracking and analytics system.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="col-md-4">
          <div className="feature-card">
            <FaFileMedical size={50} className="feature-icon text-danger" />
            <h4 className="fw-bold mt-3">Personalized Treatment Plans</h4>
            <p className="text-muted">
              Receive expert-designed therapy plans tailored to your injury, pain level, and recovery stage.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="col-md-4">
          <div className="feature-card">
            <FaComments size={50} className="feature-icon text-info" />
            <h4 className="fw-bold mt-3">Integrated Support & Communication</h4>
            <p className="text-muted">
              Chat with physiotherapists or book virtual appointments for real-time guidance and support.
            </p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="col-md-4">
          <div className="feature-card">
            <FaHospital size={50} className="feature-icon text-primary" />
            <h4 className="fw-bold mt-3">Clinically Approved by Experts</h4>
            <p className="text-muted">
              Our programs are reviewed and approved by medical professionals and physiotherapy specialists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
