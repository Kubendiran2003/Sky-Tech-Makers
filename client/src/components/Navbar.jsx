import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiLogIn, FiLogOut, FiUser, FiPlusCircle,
  FiSettings, FiMenu, FiX, FiZap, FiBook, FiTool,
  FiAward, FiHelpCircle, FiBookOpen,
} from "react-icons/fi";

const navLinks = [
  { to: "/home", label: "Home", icon: FiHome },
  { to: "/courses", label: "Courses", icon: FiBookOpen, isComingSoon: true },
  { to: "/blogs", label: "Blogs", icon: FiBook },
  { to: "/questions", label: "Interview Q&A", icon: FiHelpCircle },
  { to: "/tools", label: "Tools", icon: FiTool },
  { to: "/leaderboard", label: "Leaderboard", icon: FiAward },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[#0b192c]/95 backdrop-blur-md shadow-lg border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/40" />
                <FiZap className="relative z-10 text-white w-5 h-5" />
              </div>
              <div className="block">
                <span className="text-base sm:text-lg font-bold leading-none block text-white">
                  Sky Tech <span className="gradient-text">Makers</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium leading-none tracking-widest uppercase block mt-1 text-slate-400">Tech Learning Hub</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, isComingSoon }) =>
                isComingSoon ? (
                  <div key={to} className="relative group/courses">
                    <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-400 cursor-not-allowed hover:bg-white/5 transition-all">
                      <Icon className="w-3.5 h-3.5 group-hover/courses:text-indigo-400 transition-colors" />
                      {label}
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover/courses:block z-50 bg-[#111827] border border-slate-800 text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 px-2.5 py-1 rounded-md shadow-xl whitespace-nowrap">
                      Coming Soon
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${isActive
                        ? "text-white bg-white/8"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-indigo-400" : "group-hover:text-indigo-400"}`} />
                        {label}
                        {isActive && (
                          <motion.div
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden xl:flex items-center gap-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    <FiUser className="w-3.5 h-3.5" />
                    <span className="max-w-[100px] truncate">{user.name?.split(" ")[0]}</span>
                  </Link>
                  {user.role === "Admin" && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all duration-200"
                    >
                      <FiSettings className="w-3.5 h-3.5" />
                      Admin
                    </Link>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    <FiLogIn className="w-3.5 h-3.5" />
                    Login
                  </Link>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/register"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all duration-300"
                    >
                      <FiPlusCircle className="w-3.5 h-3.5" />
                      Join Free
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-72 z-50 bg-[#0b192c] border-l border-white/5 shadow-2xl xl:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                    <FiZap className="text-white w-4 h-4" />
                  </div>
                  <span className="font-bold text-white">Sky Tech Makers</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white">
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {navLinks.map(({ to, label, icon: Icon, isComingSoon }, i) => (
                  <motion.div
                    key={to}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {isComingSoon ? (
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed bg-white/3 border border-dashed border-white/5">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 flex-shrink-0 text-slate-500" />
                          <span>{label}</span>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <NavLink
                        to={to}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                            ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                        {label}
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-white/5 space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <FiUser className="w-4 h-4" />
                      {user.name}
                    </Link>
                    {user.role === "Admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-all"
                      >
                        <FiSettings className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <FiLogIn className="w-4 h-4" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 shadow-lg shadow-indigo-500/25 transition-all"
                    >
                      <FiPlusCircle className="w-4 h-4" />
                      Join Free
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
