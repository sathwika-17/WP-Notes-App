import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
