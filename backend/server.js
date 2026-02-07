require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const resumeRoutes = require("./routes/resumeRoutes")

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",                          // Allow Localhost (for testing)
    "https://resume-builder-ix1p.vercel.app"    // ✅ Allow your Vercel Frontend
  ],
  credentials: true, // Important if you use cookies or sessions
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these actions
  allowedHeaders: ["Content-Type", "Authorization"]
}));


//Connect DB
connectDB();


//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

app.use("/uploads", express.static("uploads"));

module.exports = app;