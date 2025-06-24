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

dotenv.config();
const app = express();

// ✅ CORS Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sky-tech-makers.netlify.app"
  ],
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

// ✅ Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`✅ Server running on port ${process.env.PORT}`)
  );
});
