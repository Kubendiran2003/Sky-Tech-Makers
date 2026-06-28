// /server/server.js
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const questionRoutes = require("./routes/questionRoutes");
const toolRoutes = require("./routes/toolRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

dotenv.config();
const app = express();

// ✅ CORS Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://sky-tech-makers.netlify.app",
  "https://sky-tech-makers.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith(".netlify.app");
                      
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Essential Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/challenges", challengeRoutes);

// ✅ Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port ${process.env.PORT}`)
  );
});
