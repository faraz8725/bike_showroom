import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",")?.map((s) => s.trim()) ?? ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
}));

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in backend .env");
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);
console.log("Mongo connected");

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

