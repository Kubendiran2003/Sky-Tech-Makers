const Challenge = require("../models/Challenge");
const ChallengeSubmission = require("../models/ChallengeSubmission");
const User = require("../models/User");
const { executeCode } = require("../utils/codeExecutor");

// Define challenge start date (defaults to July 1st, 2026)
const getStartDate = () => {
  return new Date(process.env.CHALLENGE_START_DATE || "2026-07-01T00:00:00");
};

// Calculate unlock date for a given challenge day
const getUnlockDateForDay = (day) => {
  const startDate = getStartDate();
  const unlockDate = new Date(startDate);
  unlockDate.setDate(unlockDate.getDate() + (day - 1));
  return unlockDate;
};

/**
 * Get challenge details for a specific day, verifying lock status and calendar date
 */
exports.getChallenge = async (req, res) => {
  try {
    const day = parseInt(req.params.day);
    if (isNaN(day) || day < 1 || day > 30) {
      return res.status(400).json({ msg: "Invalid challenge day" });
    }

    // Check if challenge exists
    const challenge = await Challenge.findOne({ day });
    if (!challenge) {
      return res.status(404).json({ msg: `Challenge for day ${day} not found.` });
    }

    // Check calendar date lock
    const now = new Date();
    const unlockDate = getUnlockDateForDay(day);
    if (now < unlockDate) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = unlockDate.toLocaleDateString('en-US', options);
      return res.status(403).json({
        msg: `Challenge Day ${day} is locked. It will unlock on ${formattedDate}.`,
        unlockDate: unlockDate
      });
    }

    // Verify progression unlock: Day N requires Day N-1 attempted (solved or disqualified)
    if (day > 1) {
      const prevAttempt = await ChallengeSubmission.findOne({
        user: req.user._id,
        day: day - 1,
      });
      if (!prevAttempt) {
        return res.status(403).json({ msg: `Challenge Day ${day} is locked. Complete or attempt Day ${day - 1} first.` });
      }
    }

    res.json(challenge);
  } catch (error) {
    console.error("Error in getChallenge:", error);
    res.status(500).json({ msg: "Server error retrieving challenge." });
  }
};

/**
 * Get user's progress: highest unlocked day, list of solved days, and calendar locks
 */
exports.getChallengeStatus = async (req, res) => {
  try {
    const submissions = await ChallengeSubmission.find({ user: req.user._id });
    const solvedDays = submissions.filter((sub) => !sub.isDisqualified).map((sub) => sub.day);
    const attemptedDays = submissions.map((sub) => sub.day);
    
    // Calculate calendar status for all 30 days
    const now = new Date();
    const daysStatus = [];
    let currentDay = 1;

    for (let d = 1; d <= 30; d++) {
      const unlockDate = getUnlockDateForDay(d);
      const isDateUnlocked = now >= unlockDate;
      daysStatus.push({
        day: d,
        isDateUnlocked,
        unlockDate: unlockDate.toISOString(),
      });
    }

    // Next active progression day is based on highest day attempted
    if (attemptedDays.length > 0) {
      const maxAttempted = Math.max(...attemptedDays);
      currentDay = Math.min(maxAttempted + 1, 30);
    }

    res.json({
      currentDay,
      solvedDays,
      daysStatus,
      completedAll: solvedDays.length === 30,
    });
  } catch (error) {
    console.error("Error in getChallengeStatus:", error);
    res.status(500).json({ msg: "Server error retrieving progress." });
  }
};

/**
 * Run user code against example test cases
 */
exports.runCode = async (req, res) => {
  try {
    const { day, code, language } = req.body;
    if (!day || !code || !language) {
      return res.status(400).json({ msg: "Day, code, and language are required." });
    }

    const challenge = await Challenge.findOne({ day });
    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found." });
    }

    // We run against the two example test cases
    const results = [];
    const testCasesToRun = [
      { input: challenge.exampleInput1, output: challenge.exampleOutput1, name: "Example 1" },
    ];
    if (challenge.exampleInput2) {
      testCasesToRun.push({ input: challenge.exampleInput2, output: challenge.exampleOutput2, name: "Example 2" });
    }

    for (let i = 0; i < testCasesToRun.length; i++) {
      const tc = testCasesToRun[i];
      const runResult = await executeCode(language, code, tc.input, tc.output, challenge.maxExecutionTime);
      
      const cleanStdout = runResult.stdout.trim().replace(/\r\n/g, "\n");
      const cleanExpected = tc.output.trim().replace(/\r\n/g, "\n");
      const passed = runResult.success && cleanStdout === cleanExpected;

      results.push({
        name: tc.name,
        input: tc.input,
        expected: tc.output,
        actual: runResult.stdout,
        passed,
        stderr: runResult.stderr,
        error: runResult.error,
      });
    }

    res.json({ results });
  } catch (error) {
    console.error("Error in runCode:", error);
    res.status(500).json({ msg: "Server error during code compilation/execution." });
  }
};

/**
 * Run code against all test cases, submit and unlock next day
 */
exports.submitCode = async (req, res) => {
  try {
    const { day, code, language, timeTaken } = req.body;
    if (!day || !code || !language || timeTaken === undefined) {
      return res.status(400).json({ msg: "Day, code, language, and timeTaken are required." });
    }

    // Verify calendar date lock before allowing submission
    const now = new Date();
    const unlockDate = getUnlockDateForDay(day);
    if (now < unlockDate) {
      return res.status(403).json({ msg: "Cannot submit code for a locked future challenge day." });
    }

    // Check if user already attempted (either success or disqualified) this day
    const existingSubmission = await ChallengeSubmission.findOne({ user: req.user._id, day });
    if (existingSubmission) {
      return res.status(400).json({ msg: "You have already attempted today's challenge." });
    }

    const challenge = await Challenge.findOne({ day });
    if (!challenge) {
      return res.status(404).json({ msg: "Challenge not found." });
    }

    // Run against ALL test cases (both public and hidden)
    const testCases = challenge.testCases;
    let allPassed = true;
    const testResults = [];

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const runResult = await executeCode(language, code, tc.input, tc.output, challenge.maxExecutionTime);
      
      const cleanStdout = runResult.stdout.trim().replace(/\r\n/g, "\n");
      const cleanExpected = tc.output.trim().replace(/\r\n/g, "\n");
      const passed = runResult.success && cleanStdout === cleanExpected;

      if (!passed) {
        allPassed = false;
      }

      testResults.push({
        testCaseIndex: i + 1,
        isHidden: tc.isHidden,
        passed,
        actual: tc.isHidden ? "[Hidden Test Case]" : runResult.stdout,
        expected: tc.isHidden ? "[Hidden Test Case]" : tc.output,
        stderr: runResult.stderr,
      });
    }

    if (!allPassed) {
      return res.json({ success: false, results: testResults, msg: "Some test cases failed." });
    }

    const submission = await ChallengeSubmission.create({
      user: req.user._id,
      day,
      language,
      code,
      timeTaken,
      isDisqualified: false,
    });

    res.json({
      success: true,
      results: testResults,
      msg: "Congratulations! All test cases passed.",
      submission,
    });
  } catch (error) {
    console.error("Error in submitCode:", error);
    res.status(500).json({ msg: "Server error during submission." });
  }
};

/**
 * Record user test disqualification
 */
exports.disqualifyUser = async (req, res) => {
  try {
    const { day } = req.body;
    if (!day) {
      return res.status(400).json({ msg: "Day is required." });
    }

    // Check if user already attempted
    const existingSubmission = await ChallengeSubmission.findOne({ user: req.user._id, day });
    if (existingSubmission) {
      return res.status(400).json({ msg: "You have already attempted today's challenge." });
    }

    const submission = await ChallengeSubmission.create({
      user: req.user._id,
      day,
      language: "none",
      code: "// Terminated due to tab-switching or fullscreen exit.",
      timeTaken: 0,
      isDisqualified: true,
    });

    res.json({
      success: true,
      msg: "Test terminated. Disqualification recorded successfully.",
      submission,
    });
  } catch (error) {
    console.error("Error in disqualifyUser:", error);
    res.status(500).json({ msg: "Server error during disqualification check." });
  }
};

/**
 * Get Leaderboard: Users ranked by successful challenges completed and total time taken
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const aggregatedSubmissions = await ChallengeSubmission.aggregate([
      {
        $match: { isDisqualified: { $ne: true } },
      },
      {
        $group: {
          _id: "$user",
          solvedCount: { $sum: 1 },
          totalTime: { $sum: "$timeTaken" },
        },
      },
      {
        $sort: { solvedCount: -1, totalTime: 1 },
      },
    ]);

    // Populate user details (specifically omitting email for privacy)
    const populatedLeaderboard = await User.populate(aggregatedSubmissions, {
      path: "_id",
      select: "name rollNumber",
    });

    const leaderboard = populatedLeaderboard
      .filter((entry) => entry._id !== null)
      .map((entry, index) => ({
        rank: index + 1,
        user: {
          id: entry._id._id,
          name: entry._id.name || "Anonymous",
          rollNumber: entry._id.rollNumber || "N/A",
        },
        solvedCount: entry.solvedCount,
        totalTime: entry.totalTime,
      }));

    res.json(leaderboard);
  } catch (error) {
    console.error("Error in getLeaderboard:", error);
    res.status(500).json({ msg: "Server error retrieving leaderboard rankings." });
  }
};

/**
 * Get Admin Winners: Leaderboard including user emails (Admin only)
 */
exports.getAdminWinners = async (req, res) => {
  try {
    const aggregatedSubmissions = await ChallengeSubmission.aggregate([
      {
        $match: { isDisqualified: { $ne: true } },
      },
      {
        $group: {
          _id: "$user",
          solvedCount: { $sum: 1 },
          totalTime: { $sum: "$timeTaken" },
        },
      },
      {
        $sort: { solvedCount: -1, totalTime: 1 },
      },
    ]);

    // Populate user details including email
    const populatedLeaderboard = await User.populate(aggregatedSubmissions, {
      path: "_id",
      select: "name email rollNumber",
    });

    const leaderboard = populatedLeaderboard
      .filter((entry) => entry._id !== null)
      .map((entry, index) => ({
        rank: index + 1,
        user: {
          id: entry._id._id,
          name: entry._id.name || "Anonymous",
          email: entry._id.email || "N/A",
          rollNumber: entry._id.rollNumber || "N/A",
        },
        solvedCount: entry.solvedCount,
        totalTime: entry.totalTime,
      }));

    res.json(leaderboard);
  } catch (error) {
    console.error("Error in getAdminWinners:", error);
    res.status(500).json({ msg: "Server error retrieving admin winners list." });
  }
};
