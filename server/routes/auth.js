// routes/auth.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { fullName, email, password, phone, address, dob, gender } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      dob,
      gender,
    });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    // Debug log
    console.error("Signup error:", error); // Terminal-এ পুরো error trace
    // Frontend-এ পাঠানো হবে
    res.status(500).json({ message: error.message });
  }
});

export default router;
