import { FaRegNewspaper, FaHeartbeat, FaDumbbell, FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";
import news1 from "../assets/news1.jpg";
import news2 from "../assets/news2.jpg";
import news3 from "../assets/news3.jpg";
import news4 from "../assets/news4.jpg";
import "../styles.css";

const News = () => {
  const articles = [
    {
      id: 1,
      title: "How Physiotherapy Can Reduce Chronic Pain",
      description: "Discover how physiotherapy helps manage and alleviate chronic pain through movement therapy and specialized techniques.",
      image: news1,
      icon: <FaHeartbeat size={30} className="text-primary" />,
    },
    {
      id: 2,
      title: "Best Exercises for Post-Surgery Recovery",
      description: "Recovering from surgery? Learn the most effective physiotherapy exercises to regain strength and flexibility.",
      image: news2,
      icon: <FaDumbbell size={30} className="text-success" />,
    },
    {
      id: 3,
      title: "Preventing Workplace Injuries with Physiotherapy",
      description: "Workplace injuries are common, but they can be prevented. Find out how physiotherapy reduces the risk of work-related strain.",
      image: news3,
      icon: <FaRegNewspaper size={30} className="text-warning" />,
    },
    {
      id: 4,
      title: "The Role of Physiotherapy in Elderly Care",
      description: "Physiotherapy is crucial for seniors to maintain mobility and prevent falls. Learn key techniques and treatments for the elderly.",
      image: news4,
      icon: <FaUserMd size={30} className="text-danger" />,
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">Latest <span className="text-primary">Physiotherapy News & Advice</span></h2>
      <p className="text-center mb-5">Stay updated with expert advice, health tips, and physiotherapy trends.</p>
      
      <div className="row">
        {articles.map((article) => (
          <motion.div 
            key={article.id} 
            className="col-md-6 mb-4"
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <div className="card news-card shadow-sm">
              <img src={article.image} className="card-img-top" alt={article.title} />
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center">
                  {article.icon} <span className="ms-2">{article.title}</span>
                </h5>
                <p className="card-text">{article.description}</p>
                <button className="btn btn-outline-primary">Read More</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default News;
