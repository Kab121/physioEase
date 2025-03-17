PhysioEase - A Physiotherapy Web Application 🏥💻
Table of Contents
•	Project Overview
•	Features
•	Technologies Used
•	Installation Guide
•	Database Setup
•	API Endpoints
•	Project Structure
•	Screenshots
•	Contributors
•	License
________________________________________
📌 Project Overview
PhysioEase is a web application designed to connect patients with professional physiotherapists. It allows users to:
•	Book appointments with specialized physiotherapists.
•	View available treatment plans and session details.
•	Manage appointments through a user-friendly dashboard.
This project follows Agile principles and is designed using React.js, Node.js, Express.js, and MySQL.
________________________________________
🚀 Features
✅ User authentication (Login & Register)
✅ View detailed therapist profiles
✅ Book appointments with time slot selection
✅ Store bookings in MySQL database
✅ Secure API with authentication
✅ Responsive and modern UI/UX
________________________________________
🛠️ Technologies Used
•	Frontend: React.js, Bootstrap, Framer Motion, React Router
•	Backend: Node.js, Express.js, Sequelize (ORM)
•	Database: MySQL (phpMyAdmin)
•	Authentication: JWT (JSON Web Token)
•	API Testing: Postman

📥 Installation Guide
Follow these steps to run the project locally.
1️⃣  Clone the Repository
git clone https://github.com/Kab121/physioEase.git
cd physioEase

2️⃣  Install Dependencies
Frontend (React)
cd frontend
npm install
npm start


Backend (Node.js + Express)

cd backend
npm install
npm start

Database Setup
1.	Open phpMyAdmin and create a database:

CREATE DATABASE physioease;

2.	Import the database schema (if available). 

3.	Update your config/db.js file with your MySQL credentials:

const { Sequelize } = require("sequelize");

const db = new Sequelize("physioease", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

4.	Sync the database:

npm run migrate

🔗 API Endpoints
Here are the key API routes:
Method	Endpoint	Description
POST	/api/auth/register	Register new users
POST	/api/auth/login	Authenticate users
GET	/api/therapists	Get all therapists
POST	/api/bookings/book	Book an appointment

Test the APIs using Postman or any REST API tool.

📂 Project Structure

/physioEase
│── /frontend             # React Frontend
│   ├── /src
│   │   ├── /components   # Reusable components
│   │   ├── /pages        # Application pages
│   │   ├── /context      # Authentication & Global Contexts
│   │   ├── App.jsx       # Main React file
│   │   ├── index.jsx     # Entry point
│── /backend              # Node.js Backend
│   ├── /config           # Database Configuration
│   ├── /models           # Sequelize Models
│   ├── /routes           # Express API Routes
│   ├── server.js         # Main Server File
│── package.json          # Dependencies
│── README.md             # Documentation
│── .gitignore            # Git Ignore file
Screenshots: 
 

 

 

 
