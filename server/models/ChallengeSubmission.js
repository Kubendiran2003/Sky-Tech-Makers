const mongoose = require("mongoose");

const challengeSubmissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    day: { type: Number, required: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    timeTaken: { type: Number, required: true }, // time taken in seconds
    isDisqualified: { type: Boolean, default: false },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// User can only submit one attempt (either success or disqualified) per challenge day
challengeSubmissionSchema.index({ user: 1, day: 1 }, { unique: true });

module.exports = mongoose.model("ChallengeSubmission", challengeSubmissionSchema);
