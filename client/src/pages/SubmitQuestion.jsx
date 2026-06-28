import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { submitQuestion } from "../services/questions";
import { FiArrowLeft, FiHelpCircle, FiSend, FiEdit3, FiBookOpen, FiActivity, FiBriefcase } from "react-icons/fi";
import { toast } from "react-toastify";

export default function SubmitQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    company: "",
    difficulty: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim() || !formData.company.trim() || !formData.difficulty) {
      toast.warning("All fields are required!");
      return;
    }
    setLoading(true);

    try {
      await submitQuestion(formData);
      toast.success("Interview question submitted successfully!");
      setFormData({
        question: "",
        answer: "",
        company: "",
        difficulty: "",
      });
      setTimeout(() => navigate("/questions"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "w-full pl-10 pr-4 py-3 bg-[#131524] border border-white/8 rounded-xl text-slate-300 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 cursor-pointer [&>option]:bg-[#10121f] text-sm";

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link
            to="/questions"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 text-sm font-medium mb-8 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Questions
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
            <FiHelpCircle className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Help the Community</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Submit Interview Q&A</h1>
          <p className="text-slate-500 text-sm mt-1.5">Share interview questions you encountered to help others prepare</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-strong rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/40"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Question */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Question
              </label>
              <div className="relative">
                <FiEdit3 className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                <textarea
                  name="question"
                  required
                  rows={3}
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Enter the complete interview question..."
                  className="w-full pl-10 pr-4 py-3 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Answer */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Answer
              </label>
              <div className="relative">
                <FiBookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                <textarea
                  name="answer"
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={handleChange}
                  placeholder="Provide a detailed explanation or solution code..."
                  className="w-full pl-10 pr-4 py-3 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 scrollbar-thin resize-y"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Amazon, Google, TCS"
                    className="w-full pl-10 pr-4 py-3 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Difficulty Level
                </label>
                <div className="relative">
                  <FiActivity className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <select
                    name="difficulty"
                    required
                    value={formData.difficulty}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="" disabled>Select difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 transition-all duration-300 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Submit Question
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
