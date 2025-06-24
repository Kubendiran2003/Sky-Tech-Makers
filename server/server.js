// /server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const questionRoutes = require("./routes/questionRoutes");
const toolRoutes = require("./routes/toolRoutes");

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS config
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://sky-tech-makers.netlify.app"
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight

// Middleware
app.use(express.json());
app.use(cookieParser());

// Health check route (for Render & testing)
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tools", toolRoutes);

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
