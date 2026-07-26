import { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiLock, FiMail, FiUser, FiZap, FiEye, FiEyeOff, FiUserPlus, FiCheck, FiX } from "react-icons/fi";

// Password rules — edit here if requirements ever change
const PASSWORD_RULES = [
  { id: "length", label: "At least 6 characters", test: (pw) => pw.length >= 6 },
  { id: "upper", label: "At least 1 uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { id: "lower", label: "At least 1 lowercase letter", test: (pw) => /[a-z]/.test(pw) },
  { id: "number", label: "At least 1 number", test: (pw) => /[0-9]/.test(pw) },
  { id: "special", label: "At least 1 special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  // Recompute which rules pass every time the password changes
  const ruleResults = useMemo(
    () => PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(password) })),
    [password]
  );
  const passedCount = ruleResults.filter((r) => r.passed).length;
  const isPasswordValid = passedCount === PASSWORD_RULES.length;
  const showChecklist = passwordFocused || password.length > 0;

  const strengthColor =
    passedCount <= 2 ? "bg-red-500" : passedCount <= 4 ? "bg-amber-500" : "bg-emerald-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return; // guard: don't submit until password rules pass
    setLoading(true);
    try {
      await register(name, email, password);
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "Daily coding challenges",
    "Interview Q&A library",
    "Real-time leaderboard",
    "Developer tools & resources",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-16 bg-[#f4f6f8]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left: Perks */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:block"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <FiZap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Free Forever</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Join <span className="gradient-text-blue">Sky Tech Makers</span> Today
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            A community of passionate developers leveling up their skills every single day through coding challenges and resources.
          </p>
          <div className="space-y-3">
            {perks.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <span className="text-slate-700 text-sm">{perk}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xl shadow-slate-100/50">
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl shadow-lg shadow-violet-500/30 mb-4">
                <FiUserPlus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Create Account</h3>
              <p className="text-slate-500 text-sm mt-1">Start your journey with us today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
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

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Create a strong password"
                    aria-describedby="password-requirements"
                    className={`w-full pl-10 pr-11 py-3 bg-white border rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${password.length > 0
                        ? isPasswordValid
                          ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/10"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength bar + live checklist */}
                <AnimatePresence>
                  {showChecklist && (
                    <motion.div
                      id="password-requirements"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {/* Strength bar */}
                      <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: `${(passedCount / PASSWORD_RULES.length) * 100}%` }}
                          transition={{ duration: 0.25 }}
                          className={`h-full rounded-full ${strengthColor}`}
                        />
                      </div>

                      {/* Rule checklist */}
                      <div className="mt-3 space-y-1.5">
                        {ruleResults.map((rule) => (
                          <div key={rule.id} className="flex items-center gap-2">
                            <span
                              className={`flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0 transition-colors duration-200 ${rule.passed ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                                }`}
                            >
                              {rule.passed ? <FiCheck className="w-2.5 h-2.5" /> : <FiX className="w-2.5 h-2.5" />}
                            </span>
                            <span
                              className={`text-xs transition-colors duration-200 ${rule.passed ? "text-emerald-600" : "text-slate-500"
                                }`}
                            >
                              {rule.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 bg-white accent-indigo-600 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors leading-relaxed">
                  I agree to the{" "}
                  <Link to="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">Terms and Conditions</Link>
                  {" "}and{" "}
                  <Link to="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">Privacy Policy</Link>
                </span>
              </label>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || !isPasswordValid || !agreed}
                whileHover={{ scale: loading || !isPasswordValid || !agreed ? 1 : 1.01 }}
                whileTap={{ scale: loading || !isPasswordValid || !agreed ? 1 : 0.99 }}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 transition-all duration-300 ${loading || !isPasswordValid || !agreed ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FiZap className="w-4 h-4" />
                    Create Account Free
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}