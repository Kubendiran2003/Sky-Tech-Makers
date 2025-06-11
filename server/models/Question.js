// /server/models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  company: String,
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Question", questionSchema);