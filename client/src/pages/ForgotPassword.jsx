import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiArrowLeft, FiSend, FiCheckCircle } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setSentMessage(res.message || `Password reset link sent to ${email}`);
      setSubmitted(true);
    } catch (error) {
      // Error handled by toast in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-16 bg-[#f4f6f8]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xl shadow-slate-100/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4">
              <FiMail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Forgot Password</h2>
            <p className="text-slate-500 text-sm mt-1.5">
              Please enter your registered email address to receive a password reset link.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Reset Email Sent!</h3>
              <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80 leading-relaxed">
                {sentMessage}
              </p>
              <p className="text-xs text-slate-400">
                Please check your inbox (and spam folder). The link will expire in 15 minutes.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 underline"
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Registered Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Password Reset Link
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Footer Back Link */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold text-sm transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
