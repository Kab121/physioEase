const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ This fixes the self-signed certificate issue
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Transport Error:", error);
  } else {
    console.log("✅ Email transporter ready");
  }
});

module.exports = transporter;
