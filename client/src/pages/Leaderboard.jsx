import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FiLock,
  FiUnlock,
  FiCode,
  FiPlay,
  FiCheckCircle,
  FiXCircle,
  FiGift,
  FiClock,
  FiSearch,
  FiAlertCircle,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiAlertTriangle,
} from "react-icons/fi";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-tomorrow.css";

import {
  getChallengeStatus,
  getChallenge,
  runCode,
  submitCode,
  getLeaderboard,
  disqualifyChallenge,
} from "../services/challenges";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Navigation tabs: 'challenge' | 'leaderboard'
  const [activeTab, setActiveTab] = useState("challenge");

  // Auth Guard
  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#050508] text-slate-100 flex items-center justify-center py-20 px-4">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        {/* Glowing Background Blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
          
          {/* Left Column: Challenge Perks & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <FiUnlock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Sky Test Challenge</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Unlock Your <br className="hidden sm:inline" />
              <span className="gradient-text">Coding Potential</span>
            </h1>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Join the 30-day coding challenge. Master logic in JavaScript, Python, C, C++, or Java. Complete tests in a proctored environment, rank up live, and secure exclusive giveaways.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: FiCode, title: "Multi-Language Compiler", desc: "Write solutions in JS, Python, C, C++, or Java" },
                { icon: FiCheckCircle, title: "Real-time Proctoring", desc: "Anti-cheat window detection matching real assessments" },
                { icon: FiGift, title: "Exclusive Gifts", desc: "Rank #1 on the leaderboard to win custom T-Shirts" },
              ].map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <perk.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-none">{perk.title}</h3>
                    <p className="text-slate-500 text-xs mt-1">{perk.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Beautiful Lock Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="glass-strong rounded-2xl p-8 shadow-2xl shadow-black/50 text-center border border-white/8 relative overflow-hidden group">
              {/* Card visual elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent blur-xl pointer-events-none" />
              
              <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center rounded-2xl mb-6 relative">
                <div className="absolute inset-0 bg-red-500/5 rounded-2xl animate-pulse" />
                <FiLock className="w-7 h-7 relative z-10" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Coding Challenge Locked</h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-8 px-2">
                A valid account is required to participate. Log in or create an account to start your challenge.
              </p>
              
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold text-slate-300 bg-[#131524] border border-white/8 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    );
  }

  // State variables for Challenge tab
  const [userStatus, setUserStatus] = useState({ currentDay: 1, solvedDays: [], completedAll: false });
  const [selectedDay, setSelectedDay] = useState(1);
  const [challengeData, setChallengeData] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loadingChallenge, setLoadingChallenge] = useState(false);
  
  // Real-Time HackerRank test environment states
  const [testStarted, setTestStarted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

  // Code runner states
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runResults, setRunResults] = useState(null);
  const [submitResults, setSubmitResults] = useState(null);

  // Time tracker (5 minutes countdown)
  const [timeLeft, setTimeLeft] = useState(300);
  const timerRef = useRef(null);

  // Leaderboard states
  const [rankings, setRankings] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Gift Modal Claim state
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftSize, setGiftSize] = useState("L");
  const [giftAddress, setGiftAddress] = useState("");
  const [giftPhone, setGiftPhone] = useState("");
  const [giftClaimed, setGiftClaimed] = useState(false);

  // Initialize status & load default challenge
  useEffect(() => {
    fetchUserStatus();
    fetchLeaderboardData();
  }, []);

  // Sync challenge code when day or language changes
  useEffect(() => {
    if (challengeData) {
      setCode(challengeData.templates[language] || "");
    }
  }, [challengeData, language]);

  const isDisqualifying = useRef(false);

  const handleCheat = async (reason = "exited the test window") => {
    if (isDisqualifying.current || isDisqualified) return;
    isDisqualifying.current = true;
    setIsDisqualified(true);
    toast.error(`Test Terminated: You ${reason}.`);
    
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (e) {}
    }
    
    try {
      await disqualifyChallenge(selectedDay);
      fetchUserStatus();
      fetchLeaderboardData();
    } catch (err) {
      console.error("Disqualify API failed:", err);
    } finally {
      isDisqualifying.current = false;
    }
  };

  const handleTimeOut = () => {
    handleCheat("ran out of time");
  };

  // Timer logic for tracking solution time (5 minutes countdown)
  useEffect(() => {
    if (activeTab === "challenge" && testStarted && challengeData && !submitting && !isDisqualified && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimeout(() => handleTimeOut(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [activeTab, testStarted, challengeData, submitting, isDisqualified, timeLeft]);

  // Hook for monitoring tab switches or exits from fullscreen
  useEffect(() => {
    if (!testStarted || isDisqualified) return;

    const handleCheatTrigger = () => {
      handleCheat("exited the test window");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleCheat("switched browser tabs");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && testStarted && !isDisqualified) {
        handleCheat("exited full screen mode");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleCheatTrigger);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleCheatTrigger);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [testStarted, isDisqualified, selectedDay]);

  // Toggle body class for hiding navbar & footer globally during active test
  useEffect(() => {
    if (testStarted && !isDisqualified) {
      document.body.classList.add("fullscreen-test-active");
    } else {
      document.body.classList.remove("fullscreen-test-active");
    }
    return () => {
      document.body.classList.remove("fullscreen-test-active");
    };
  }, [testStarted, isDisqualified]);

  const fetchUserStatus = async () => {
    try {
      const data = await getChallengeStatus();
      setUserStatus(data);
      setSelectedDay(data.currentDay);
      loadChallengeDetails(data.currentDay);
    } catch (err) {
      toast.error("Failed to load your progress status.");
    }
  };

  const loadChallengeDetails = async (day) => {
    setLoadingChallenge(true);
    setRunResults(null);
    setSubmitResults(null);
    try {
      const data = await getChallenge(day);
      setChallengeData(data);
      setCode(data.templates[language] || "");
      
      // Dynamic timer allocation: Easy = 5m (300s), Medium = 10m (600s), Hard = 15m (900s)
      let timeAllocated = 300;
      if (data.difficulty === "Medium") timeAllocated = 600;
      else if (data.difficulty === "Hard") timeAllocated = 900;
      setTimeLeft(timeAllocated);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to load challenge details.");
    } finally {
      setLoadingChallenge(false);
    }
  };

  const fetchLeaderboardData = async () => {
    setLoadingLeaderboard(true);
    try {
      const data = await getLeaderboard();
      setRankings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const handleStartTest = () => {
    const element = document.documentElement;
    const requestMethod = element.requestFullscreen || 
                          element.webkitRequestFullscreen || 
                          element.mozRequestFullScreen || 
                          element.msRequestFullscreen;

    if (requestMethod) {
      requestMethod.call(element)
        .then(() => {
          setTestStarted(true);
          setIsDisqualified(false);
          setSelectedDay(userStatus.currentDay);
          loadChallengeDetails(userStatus.currentDay);
          toast.info(`Sky Test Challenge Started! Day ${userStatus.currentDay}`);
        })
        .catch((err) => {
          toast.error("You must allow fullscreen permission to enter this official challenge test.");
          console.error(err);
        });
    } else {
      // Fallback
      setTestStarted(true);
      setIsDisqualified(false);
      setSelectedDay(userStatus.currentDay);
      loadChallengeDetails(userStatus.currentDay);
    }
  };

  const handleReturnToDashboard = () => {
    setTestStarted(false);
    setIsDisqualified(false);
    setRunResults(null);
    setSubmitResults(null);
    setTimeLeft(300);
  };

  const handleRunCode = async () => {
    if (!code.trim()) {
      toast.warning("Please write some code before running!");
      return;
    }
    setRunning(true);
    setRunResults(null);
    setSubmitResults(null);
    try {
      const result = await runCode(selectedDay, code, language);
      setRunResults(result.results);
      const allPassed = result.results.every((tc) => tc.passed);
      if (allPassed) {
        toast.success("Sample test cases passed!");
      } else {
        toast.error("Some sample test cases failed.");
      }
    } catch (err) {
      toast.error("Error executing code.");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!code.trim()) {
      toast.warning("Please write some code before submitting!");
      return;
    }
    setSubmitting(true);
    setRunResults(null);
    setSubmitResults(null);
    const maxTime = challengeData?.difficulty === "Medium" ? 600 : challengeData?.difficulty === "Hard" ? 900 : 300;
    const timeSpent = maxTime - timeLeft;
    try {
      const result = await submitCode(selectedDay, code, language, timeSpent);
      setSubmitResults(result);
      if (result.success) {
        toast.success("Challenge Completed! Next day unlocked.");
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setTestStarted(false);
        setIsDisqualified(false);
        fetchUserStatus();
        fetchLeaderboardData();
        setActiveTab("leaderboard");
      } else {
        toast.error("Hidden test cases failed. Keep trying!");
      }
    } catch (err) {
      toast.error("Error submitting code.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaimGift = (e) => {
    e.preventDefault();
    if (!giftAddress.trim() || !giftPhone.trim()) {
      toast.warning("Please enter your complete address and phone number!");
      return;
    }
    setGiftClaimed(true);
    setShowGiftModal(false);
    toast.success(`Congratulations! Your T-Shirt (Size: ${giftSize}) claim has been registered.`);
  };

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Filter rankings by name or rollNumber
  const filteredRankings = rankings.filter((entry) => {
    const searchVal = searchTerm.toLowerCase();
    const nameMatch = entry.user.name.toLowerCase().includes(searchVal);
    const rollMatch = entry.user.rollNumber && entry.user.rollNumber.toLowerCase().includes(searchVal);
    return nameMatch || rollMatch;
  });

  // Paginated rankings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRankings = filteredRankings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage) || 1;

  // Shared T-Shirt Card element
  const renderTShirtCard = () => {
    const myRanking = rankings.find((r) => r.user.id === user.id);
    const myRank = myRanking ? myRanking.rank : null;

    return (
      <div className="bg-[#12131a] border border-[#20232a] rounded-xl p-5 text-center shadow-xl sticky top-24">
        <div className="w-full aspect-square bg-[#1b1c26] rounded-lg overflow-hidden mb-4 border border-[#272a37] flex items-center justify-center relative group">
          <img
            src="/tshirt.png"
            alt="Sky Tech Makers Printed T-Shirt Gift"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow">
            Free Giveaway
          </div>
        </div>

        <h3 className="text-lg font-extrabold text-white mb-1">
          Sky Tech Makers T-Shirt
        </h3>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed text-left">
          We offer a free giveaway of this premium custom printed black T-shirt to the Rank 🥇 1 user on the Leaderboard. Complete all 30 days of challenges to secure your place. The final winner will be contacted via email.
        </p>

        {/* Rank display */}
        <div className="mb-4 p-3 bg-[#181a24] border border-[#272a37] rounded-lg text-center">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Your Current Position</span>
          {myRank === 1 ? (
            <div className="text-sm font-extrabold text-yellow-400 flex items-center justify-center gap-1">
              🥇 Rank 1 (Current Leader!)
            </div>
          ) : myRank ? (
            <div className="text-sm font-bold text-blue-400">
              Rank #{myRank}
              <span className="text-[10px] text-gray-500 block font-normal mt-1">Climb to Rank 1 to win the T-Shirt!</span>
            </div>
          ) : (
            <div className="text-xs text-gray-500 font-semibold">
              Unranked (Solve today's code to enter)
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs font-semibold mb-1 text-gray-300">
            <span>Your Progress</span>
            <span>{userStatus.solvedDays.length} / 30 solved</span>
          </div>
          <div className="w-full bg-[#1e202b] h-2.5 rounded-full overflow-hidden border border-[#2c304a]">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(userStatus.solvedDays.length / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Check locks for dashboard landing page
  const nextActiveDay = userStatus.currentDay; 
  const nextActiveDayStatus = userStatus.daysStatus?.find(ds => ds.day === nextActiveDay);
  const isNextActiveDayOpen = nextActiveDayStatus ? nextActiveDayStatus.isDateUnlocked : true;

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-gray-200 py-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Render normal header only if NOT in fullscreen test */}
        {!testStarted && (
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-[#20232a] pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Daily Coding Challenge
                </span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Test your logic from Monday to Saturday, unlock hard challenges, and win custom gifts!
              </p>
            </div>
            
            {/* Tab selectors */}
            <div className="flex bg-[#12131a] p-1 rounded-lg border border-[#20232a]">
              <button
                onClick={() => setActiveTab("challenge")}
                className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                  activeTab === "challenge"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Workspace
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                  activeTab === "leaderboard"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Leader Board
              </button>
            </div>
          </div>
        )}

        {/* WORKSPACE TAB */}
        {activeTab === "challenge" && (
          <div className="flex flex-col gap-6">
            
            {/* 1. DISQUALIFIED SCREEN */}
            {isDisqualified ? (
              <div className="flex flex-col items-center justify-center py-24 bg-red-950/15 border border-red-500/20 rounded-xl p-8 max-w-2xl mx-auto text-center shadow-2xl">
                <FiAlertTriangle className="w-16 h-16 text-red-500 mb-6 animate-bounce" />
                <h2 className="text-2xl font-extrabold text-white mb-3">Test Terminated / Disqualified</h2>
                <p className="text-red-300 text-sm mb-8 leading-relaxed">
                  You exited the test window, switched tabs, or ran out of time. Your session has been terminated and disqualified. You cannot retry or retake today's challenge. Please return to the dashboard and wait for tomorrow's challenge to open.
                </p>
                <button
                  onClick={handleReturnToDashboard}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition shadow-lg shadow-red-600/25 text-sm"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : !testStarted ? (
              
              /* 30-DAY COMPLETED SCREEN */
              (userStatus.completedAll || userStatus.solvedDays.length >= 30) ? (
                <div className="flex flex-col items-center justify-center py-16 bg-[#10121f] border border-white/8 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent blur-xl pointer-events-none" />
                  
                  <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center rounded-2xl mb-6 relative">
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl animate-ping" />
                    <FiAward className="w-10 h-10 text-indigo-400" />
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-white mb-3">1st Month Challenge Completed!</h2>
                  <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                    Amazing achievement! You have successfully solved all 30 days of the Sky Test Challenge.
                  </p>
                  
                  {/* Rank Display & Claim Details */}
                  {(() => {
                    const myRanking = rankings.find((r) => r.user.id === user.id);
                    const myRank = myRanking ? myRanking.rank : null;
                    
                    if (myRank === 1) {
                      return (
                        <div className="w-full bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 mb-6">
                          <h3 className="text-xl font-bold text-yellow-400 mb-2">🏆 Champion - Leaderboard Rank #1</h3>
                          <p className="text-slate-300 text-xs mb-6 leading-relaxed">
                            Congratulations Champion! You topped the leaderboard of the Sky Test Challenge. Your dedication, logic, and speed have earned you the ultimate Rank 1. Claim your exclusive giveaway gift below!
                          </p>
                          
                          {giftClaimed ? (
                            <div className="px-5 py-3 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl text-xs font-bold">
                              ✓ Giveaway Gift Registered! We will contact you soon.
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowGiftModal(true)}
                              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-yellow-500/10 transition-all duration-200"
                            >
                              Claim T-Shirt Giveaway Gift
                            </button>
                          )}
                        </div>
                      );
                    } else if (myRank) {
                      return (
                        <div className="w-full bg-white/3 border border-white/5 rounded-xl p-6 mb-6">
                          <h3 className="text-lg font-bold text-white mb-1.5">Your Position: Rank #{myRank}</h3>
                          <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
                            Great effort! You finished the challenge at Rank #{myRank}. Keep coding and refining your logic skills to top the next month's sprint!
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div className="w-full bg-white/3 border border-white/5 rounded-xl p-6 mb-6">
                          <h3 className="text-sm font-semibold text-slate-400">Evaluating final leaderboard positions...</h3>
                        </div>
                      );
                    }
                  })()}
                </div>
              ) : (
                
                /* PRE-START OR IN-PROGRESS OR WAITING STATUS */
                (() => {
                  const now = new Date();
                  const nextActiveDay = userStatus.currentDay;
                  
                  // July is index 6
                  const unlockDate = new Date(2026, 6, nextActiveDay, 0, 0, 0, 0);
                  const isUnlockedByDate = now.getTime() >= unlockDate.getTime();
                  
                  // If we are before July 1st, 12 AM
                  if (now.getTime() < new Date(2026, 6, 1, 0, 0, 0, 0).getTime()) {
                    return (
                      <div className="flex flex-col items-center justify-center py-20 bg-[#10121f] border border-white/7 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-xl">
                        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center rounded-2xl mb-6">
                          <FiLock className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Roadmap Locked</h2>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                          The official 30-Day Sky Test Challenge will begin on <span className="text-indigo-400 font-semibold">July 1st, 2026 at 12:00 AM IST</span>.
                        </p>
                        <span className="px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold text-xs rounded-full uppercase tracking-wider">
                          Opens July 1st 12:00 AM
                        </span>
                      </div>
                    );
                  }
                  
                  // If the next active challenge day is not date-unlocked yet
                  if (!isUnlockedByDate) {
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    const dateStr = `${months[unlockDate.getMonth()]} ${unlockDate.getDate()}, ${unlockDate.getFullYear()} at 12:00 AM`;
                    return (
                      <div className="flex flex-col items-center justify-center py-20 bg-[#10121f] border border-white/7 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-xl">
                        <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center rounded-2xl mb-6">
                          <FiLock className="w-8 h-8 text-amber-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Day {nextActiveDay} Challenge is Locked</h2>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                          Today's challenge is not available yet. Day {nextActiveDay} challenge will open on:
                          <span className="text-indigo-400 font-semibold block mt-1.5">{dateStr}</span>
                        </p>
                        <span className="px-4 py-2 bg-white/3 border border-white/5 text-slate-500 font-bold text-xs rounded-full uppercase tracking-wider">
                          Locked - Wait for Tomorrow
                        </span>
                      </div>
                    );
                  }
                  
                  // Otherwise, challenge is open and ready to solve!
                  return (
                    <div className="flex flex-col items-center justify-center py-16 bg-[#10121f] border border-white/7 rounded-2xl p-8 max-w-2xl mx-auto shadow-xl">
                      <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 flex items-center justify-center rounded-2xl mb-6">
                        <FiUnlock className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        Day {nextActiveDay} Challenge is Available!
                      </h2>
                      <p className="text-xs text-slate-500 mb-6 uppercase tracking-wider font-semibold">
                        Official Sky Test Challenge Conditions Apply
                      </p>
    
                      <div className="w-full bg-[#080b14] border border-white/7 rounded-xl p-6 mb-8 text-left space-y-3.5 text-sm">
                        <h4 className="font-bold text-slate-300 flex items-center gap-2 mb-1">
                          <FiCode className="text-indigo-400" /> Test Instructions:
                        </h4>
                        <div className="flex gap-3 text-slate-400">
                          <span className="text-indigo-400 font-bold">1.</span>
                          <p>Clicking "Start Challenge Test" automatically launches the browser in **Full Screen Mode**.</p>
                        </div>
                        <div className="flex gap-3 text-slate-400">
                          <span className="text-red-400 font-bold">2.</span>
                          <p className="text-red-300/90 font-medium">Any attempt to exit fullscreen mode, switch tabs, or click out of the test window will **disqualify** you and terminate the test immediately.</p>
                        </div>
                        <div className="flex gap-3 text-slate-400">
                          <span className="text-indigo-400 font-bold">3.</span>
                          <p>Solve the problem by passing all example inputs and hidden test cases, then click **Submit Code**.</p>
                        </div>
                        <div className="flex gap-3 text-slate-400">
                          <span className="text-indigo-400 font-bold">4.</span>
                          <p>C, C++, Java, Python 3, and Node.js JavaScript are fully supported.</p>
                        </div>
                      </div>
    
                      <button
                        onClick={handleStartTest}
                        className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold rounded-xl shadow-lg shadow-indigo-500/20 text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
                      >
                        Start Challenge Test
                      </button>
                    </div>
                  );
                })()
              )
            ) : (
              
              /* 3. ACTIVE FULLSCREEN HACKERRANK SPLIT WORKSPACE */
              <div className="flex flex-col gap-6">
                
                {/* Fullscreen Header banner */}
                <div className="bg-[#12131a] border border-[#20232a] rounded-xl p-4 flex justify-between items-center shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Live Testing Mode • Day {challengeData?.day}
                    </span>
                  </div>
                  <div className="text-xs text-red-400 font-semibold uppercase tracking-wider bg-red-500/10 border border-red-500/10 px-3 py-1 rounded">
                    Do not exit full screen (Esc) or switch tabs
                  </div>
                </div>

                {/* Left/Right Splits */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Left Column: Challenge Description */}
                  {loadingChallenge ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-[#12131a] rounded-xl border border-[#20232a] h-full">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-400">Loading challenge details...</p>
                    </div>
                  ) : challengeData ? (
                    <div className="bg-[#12131a] border border-[#20232a] rounded-xl p-6 shadow-xl flex flex-col justify-between h-[calc(100vh-140px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-800">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#20232a] pb-4 mb-4">
                          <div>
                            <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-600/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded">
                              Week {challengeData.week} • {challengeData.difficulty}
                            </span>
                            <h2 className="text-xl font-bold text-white mt-2">
                              Day {challengeData.day}: {challengeData.title}
                            </h2>
                          </div>
                          
                          {/* Timer Widget */}
                          <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg font-mono text-sm font-semibold ${
                            timeLeft > 180 ? "bg-green-500/10 text-green-400 border-green-500/20" : 
                            timeLeft > 60 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : 
                            "bg-red-500/10 text-red-400 border-red-500/20 animate-pulse"
                          }`}>
                            <FiClock className={timeLeft <= 60 ? "animate-bounce" : "animate-pulse"} />
                            <span>{formatTime(timeLeft)}</span>
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line mb-6 font-sans">
                          {challengeData.description}
                        </p>

                        {/* Example inputs & outputs */}
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-[#181a24] border border-[#272a37] p-4 rounded-lg">
                            <span className="text-xs font-bold text-gray-400 tracking-wide block mb-2 uppercase">
                              Example Input 1
                            </span>
                            <pre className="font-mono text-xs text-blue-300 whitespace-pre-wrap">
                              {challengeData.exampleInput1}
                            </pre>
                            <span className="text-xs font-bold text-gray-400 tracking-wide block mt-3 mb-2 uppercase">
                              Example Output 1
                            </span>
                            <pre className="font-mono text-xs text-green-300 whitespace-pre-wrap">
                              {challengeData.exampleOutput1}
                            </pre>
                          </div>

                          {challengeData.exampleInput2 && (
                            <div className="bg-[#181a24] border border-[#272a37] p-4 rounded-lg">
                              <span className="text-xs font-bold text-gray-400 tracking-wide block mb-2 uppercase">
                                Example Input 2
                              </span>
                              <pre className="font-mono text-xs text-blue-300 whitespace-pre-wrap">
                                {challengeData.exampleInput2}
                              </pre>
                              <span className="text-xs font-bold text-gray-400 tracking-wide block mt-3 mb-2 uppercase">
                                Example Output 2
                              </span>
                              <pre className="font-mono text-xs text-green-300 whitespace-pre-wrap">
                                {challengeData.exampleOutput2}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-3 border-t border-[#20232a] flex items-center justify-between text-xs text-gray-500">
                        <span>Max Execution Time: {challengeData.maxExecutionTime}ms</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#12131a] border border-[#20232a] rounded-xl p-8 text-center text-gray-400 h-full flex flex-col justify-center items-center">
                      <FiAlertCircle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                      <p className="font-bold text-white mb-2">No Active Challenge</p>
                      <p>Check roadmap above.</p>
                    </div>
                  )}

                  {/* Right Column: Code Editor & Execution Outputs */}
                  <div className="flex flex-col gap-6 h-[calc(100vh-140px)] overflow-y-auto pr-1">
                    {challengeData && (
                      <>
                        {/* Editor workspace */}
                        <div className="bg-[#12131a] border border-[#20232a] rounded-xl overflow-hidden shadow-xl flex-shrink-0">
                          <div className="bg-[#161722] px-6 py-3 border-b border-[#20232a] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <FiCode className="text-blue-500" />
                              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Editor Workspace</span>
                            </div>
                            
                            {/* Language selection dropdown */}
                            <select
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="bg-[#0f1015] border border-[#272a37] text-gray-300 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                            >
                              <option value="javascript">JavaScript (Node 18)</option>
                              <option value="python">Python 3</option>
                              <option value="c">C (GCC)</option>
                              <option value="cpp">C++ (G++)</option>
                              <option value="java">Java (JDK)</option>
                            </select>
                          </div>

                          {/* Text area code editor with watermark */}
                          <div className="relative font-mono text-sm leading-6">
                            <div className="absolute right-4 bottom-4 pointer-events-none text-gray-700/20 font-bold select-none text-right z-10">
                              <div>{user.name}</div>
                              <div>{user.rollNumber || "User"}</div>
                            </div>

                            <Editor
                              value={code}
                              onValueChange={(val) => setCode(val)}
                              highlight={(val) => {
                                let lang = Prism.languages.javascript;
                                if (language === "python") lang = Prism.languages.python;
                                else if (language === "c") lang = Prism.languages.c;
                                else if (language === "cpp") lang = Prism.languages.cpp;
                                else if (language === "java") lang = Prism.languages.java;
                                return Prism.highlight(val || "", lang, language);
                              }}
                              padding={24}
                              style={{
                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                fontSize: 14,
                                minHeight: "350px",
                                outline: "none",
                              }}
                              className="w-full bg-[#0a0b0d] text-[#e2e8f0] font-mono leading-relaxed"
                              placeholder="/* Write your code here */"
                            />
                          </div>

                          {/* Action buttons */}
                          <div className="bg-[#161722] px-6 py-4 border-t border-[#20232a] flex justify-between items-center gap-3">
                            <div className="text-xs text-gray-500">
                              Press Run to test sample test cases first.
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={handleRunCode}
                                disabled={running || submitting}
                                className="flex items-center gap-2 px-4 py-2 border border-[#2c304a] text-gray-300 hover:text-white hover:bg-[#1f2235] text-sm font-semibold rounded-lg transition duration-200 disabled:opacity-50"
                              >
                                {running ? "Running..." : <><FiPlay /> Run Code</>}
                              </button>
                              <button
                                onClick={handleSubmitCode}
                                disabled={running || submitting}
                                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-600/10 transition duration-200 disabled:opacity-50"
                              >
                                {submitting ? "Submitting..." : <><FiCheckCircle /> Submit code</>}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Execution Outputs */}
                        <AnimatePresence>
                          {(runResults || submitResults) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-[#12131a] border border-[#20232a] rounded-xl p-6 shadow-xl flex-shrink-0"
                            >
                              <h3 className="text-sm font-bold text-gray-400 mb-4 tracking-wider uppercase">
                                Execution Outputs
                              </h3>
                              
                              {/* Sample Run results */}
                              {runResults && (
                                <div className="space-y-4">
                                  {runResults.map((tc, idx) => (
                                    <div key={idx} className="bg-[#0a0b0d] border border-[#20232a] p-4 rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-gray-300">{tc.name}</span>
                                        {tc.passed ? (
                                          <span className="flex items-center gap-1 text-green-400 text-xs font-semibold">
                                            <FiCheckCircle /> Passed
                                          </span>
                                        ) : (
                                          <span className="flex items-center gap-1 text-red-400 text-xs font-semibold">
                                            <FiXCircle /> Failed
                                          </span>
                                        )}
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-xs">
                                        <div>
                                          <span className="text-gray-500 block">Expected stdout:</span>
                                          <pre className="font-mono bg-[#161720]/50 p-2 rounded text-green-300 whitespace-pre-wrap mt-1">
                                            {tc.expected.trim()}
                                          </pre>
                                        </div>
                                        <div>
                                          <span className="text-gray-500 block">Actual stdout:</span>
                                          <pre className="font-mono bg-[#161720]/50 p-2 rounded text-blue-300 whitespace-pre-wrap mt-1">
                                            {tc.actual.trim() || "[No output]"}
                                          </pre>
                                        </div>
                                      </div>
                                      {tc.stderr && (
                                        <div className="mt-2 text-xs">
                                          <span className="text-red-400 block font-semibold">Stderr/Diagnostics:</span>
                                          <pre className="font-mono bg-red-950/20 border border-red-500/10 text-red-300 p-2 rounded mt-1 whitespace-pre-wrap">
                                            {tc.stderr}
                                          </pre>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Submission results */}
                              {submitResults && (
                                <div>
                                  <div className={`p-4 rounded-lg flex items-start gap-3 border ${
                                    submitResults.success
                                      ? "bg-green-500/5 border-green-500/20 text-green-400"
                                      : "bg-red-500/5 border-red-500/20 text-red-400"
                                  }`}>
                                    {submitResults.success ? (
                                      <FiCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    ) : (
                                      <FiXCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div>
                                      <p className="text-sm font-bold">{submitResults.success ? "All test cases passed!" : "Some test cases failed."}</p>
                                      <p className="text-xs opacity-80 mt-1">{submitResults.msg}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 space-y-2">
                                    {submitResults.results.map((tc, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-xs bg-[#0a0b0d] p-3 rounded border border-[#20232a]">
                                        <span className="font-mono text-gray-400">
                                          Test Case #{tc.testCaseIndex} {tc.isHidden ? "(Hidden)" : ""}
                                        </span>
                                        {tc.passed ? (
                                          <span className="text-green-400 font-semibold flex items-center gap-1">
                                            <FiCheckCircle /> Pass
                                          </span>
                                        ) : (
                                          <span className="text-red-400 font-semibold flex items-center gap-1">
                                            <FiXCircle /> Fail
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === "leaderboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Leaderboard rankings list (9 columns) */}
            <div className="lg:col-span-9 bg-[#12131a] border border-[#20232a] rounded-xl overflow-hidden shadow-2xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Leader Board - Programming Tutorials
                </h2>
                
                {/* Search input */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <FiSearch className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search name or roll no..."
                      className="bg-[#0f1015] border border-[#272a37] text-gray-300 text-xs rounded-md pl-9 pr-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {loadingLeaderboard ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
                  <p className="text-gray-400 text-sm">Loading rankings...</p>
                </div>
              ) : filteredRankings.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  No users found matching your search.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-[#161722] text-gray-400 uppercase text-[10px] tracking-widest border-b border-[#20232a]">
                      <tr>
                        <th className="py-4 px-6 font-bold w-16">#</th>
                        <th className="py-4 px-6 font-bold">Name</th>
                        <th className="py-4 px-6 font-bold">Roll Number</th>
                        <th className="py-4 px-6 font-bold text-center">Solved Challenges</th>
                        <th className="py-4 px-6 font-bold text-center">Total Time taken</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e202b]">
                      {currentRankings.map((entry, index) => {
                        const absoluteRank = indexOfFirstItem + index + 1;
                        
                        // Highlight top 3
                        let rowStyle = "";
                        let rankBadge = absoluteRank;
                        if (absoluteRank === 1) {
                          rowStyle = "bg-yellow-500/5";
                          rankBadge = "🥇";
                        } else if (absoluteRank === 2) {
                          rowStyle = "bg-gray-400/5";
                          rankBadge = "🥈";
                        } else if (absoluteRank === 3) {
                          rowStyle = "bg-amber-600/5";
                          rankBadge = "🥉";
                        }

                        return (
                          <tr key={entry.user.id} className={`hover:bg-[#161722]/50 transition duration-150 ${rowStyle}`}>
                            <td className="py-4 px-6 font-bold text-sm text-gray-400">{rankBadge}</td>
                            <td className="py-4 px-6 font-bold text-white">{entry.user.name}</td>
                            <td className="py-4 px-6 font-mono text-xs text-gray-400">{entry.user.rollNumber}</td>
                            <td className="py-4 px-6 text-center text-blue-400 font-extrabold">{entry.solvedCount} / 30</td>
                            <td className="py-4 px-6 text-center font-mono text-xs text-gray-300">
                              {formatTime(entry.totalTime)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-between items-center border-t border-[#20232a] pt-4 mt-6">
                      <span className="text-xs text-gray-500">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRankings.length)} of {filteredRankings.length} rank entries
                      </span>
                      
                      <div className="flex items-center gap-1.5 bg-[#0f1015] border border-[#20232a] p-1 rounded">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#1c1d29] disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <FiChevronLeft className="w-5 h-5" />
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-3 py-1 text-xs font-semibold rounded ${
                              currentPage === p
                                ? "bg-blue-600 text-white"
                                : "text-gray-400 hover:text-white hover:bg-[#1c1d29]"
                            }`}
                          >
                            {p}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#1c1d29] disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <FiChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Gift Card (3 columns) */}
            <div className="lg:col-span-3">
              {renderTShirtCard()}
            </div>
          </div>
        )}
      </div>

      {/* GIFT CLAIM MODAL */}
      <AnimatePresence>
        {showGiftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGiftModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#161822] border border-[#272a37] w-full max-w-md p-6 rounded-xl shadow-2xl relative z-10 text-gray-200"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiGift className="text-green-500" /> Claim Sky Tech Makers T-Shirt
              </h2>
              
              <form onSubmit={handleClaimGift} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Select T-Shirt Size</label>
                  <div className="grid grid-cols-5 gap-2">
                    {["S", "M", "L", "XL", "XXL"].map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => setGiftSize(sz)}
                        className={`py-2 text-xs font-bold rounded-lg border text-center transition-all ${
                          giftSize === sz
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "bg-[#0d0e12] border-[#272a37] text-gray-400 hover:text-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={giftPhone}
                    onChange={(e) => setGiftPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#0d0e12] border border-[#272a37] text-gray-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Shipping Address
                  </label>
                  <textarea
                    id="address"
                    rows={4}
                    required
                    value={giftAddress}
                    onChange={(e) => setGiftAddress(e.target.value)}
                    placeholder="Enter your complete shipping address..."
                    className="w-full bg-[#0d0e12] border border-[#272a37] text-gray-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowGiftModal(false)}
                    className="px-4 py-2 border border-[#272a37] text-gray-400 hover:text-white rounded-lg text-sm transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm shadow-lg shadow-green-600/10 transition"
                  >
                    Claim Gift
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
