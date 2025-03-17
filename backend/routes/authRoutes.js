const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("📩 Registration Request:", { name, email, password });

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("❌ Email Already Registered:", email);
      return res.status(400).json({ error: "Email already registered!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed Password:", hashedPassword);

    // Insert user into database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ User Registered:", newUser);
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error("🔥 Registration Error:", err);
    res.status(500).json({ error: "Server error!" });
  }
});

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📩 Login Attempt:", { email, password });

    // Retrieve user from database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User Not Found in DB:", email);
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    console.log("🔍 User Found:", user.email);
    console.log("🔑 Hashed Password in DB:", user.password);

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔄 Comparing Passwords:", isMatch);

    if (!isMatch) {
      console.log("❌ Password Mismatch for:", email);
      return res.status(400).json({ error: "Invalid email or password!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, "secretkey", { expiresIn: "1h" });

    console.log("✅ Login Successful:", email);
    res.json({ message: "Login successful!", token });

  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ error: "Server error!" });
  }
});

// ✅ GET USER DATA (Protected)
router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "secretkey");

    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email"], // Exclude password
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });

  } catch (err) {
    console.error("🔥 Error fetching user:", err);
    res.status(500).json({ error: "Server error!" });
  }
});

module.exports = router;
