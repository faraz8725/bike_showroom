import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { role: user.isAdmin ? "admin" : "user" },
    process.env.JWT_SECRET,
    {
      subject: user._id.toString(),
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
}

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Bootstrap: first registered user becomes admin (optional but useful)
    const userCount = await User.countDocuments({});
    const isAdmin = userCount === 0;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: String(email).toLowerCase().trim(),
      passwordHash,
      isAdmin,
    });

    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Login failed" });
  }
});

// Me (restore session)
router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.auth.userId).select("_id email isAdmin");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
});

// Logout (client-side token removal for JWT)
router.post("/logout", async (_req, res) => {
  return res.json({ ok: true });
});

export default router;

