const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, unique: true },
    week: { type: Number, required: true },
    difficulty: { type: String, enum: ["Very Easy", "Easy", "Medium", "Hard"], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    exampleInput1: { type: String, required: true },
    exampleOutput1: { type: String, required: true },
    exampleInput2: { type: String },
    exampleOutput2: { type: String },
    maxExecutionTime: { type: Number, default: 2000 }, // in milliseconds
    testCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        isHidden: { type: Boolean, default: false },
      },
    ],
    templates: {
      c: { type: String, default: "" },
      cpp: { type: String, default: "" },
      java: { type: String, default: "" },
      python: { type: String, default: "" },
      javascript: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
