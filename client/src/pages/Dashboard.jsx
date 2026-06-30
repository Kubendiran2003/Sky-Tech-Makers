import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProfile } from "../services/auth";
import { getBlogs } from "../services/blogs";
import { getMyQuestions } from "../services/questions";
import {
  FiBook, FiUser, FiSettings, FiPlusCircle,
  FiZap, FiCheckCircle, FiClock, FiAward, FiArrowRight, FiHelpCircle,
} from "react-icons/fi";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, blogsData, questionsData] = await Promise.all([
          getProfile(),
          getBlogs(),
          getMyQuestions(),
        ]);
        setUser(profileData);
        setBlogs(blogsData.filter((blog) => blog.author?._id === profileData._id));
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: FiUser,
      label: "Account Type",
      value: user?.role || "User",
      color: "from-indigo-500 to-violet-600",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      icon: FiBook,
      label: "Your Blogs",
      value: blogs.length,
      color: "from-sky-500 to-indigo-500",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
    },
    {
      icon: FiHelpCircle,
      label: "Your Questions",
      value: questions.length,
      color: "from-violet-500 to-fuchsia-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      icon: FiAward,
      label: "Roll Number",
      value: user?.rollNumber || "—",
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header */}
        <motion.div {...fadeIn(0)} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <FiZap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-500 text-sm">Welcome back, <span className="text-indigo-400 font-semibold">{user?.name}</span> 👋</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon: Icon, label, value, color, bg, border }, i) => (
            <motion.div key={label} {...fadeIn(i * 0.08)}>
              <div className={`p-5 rounded-2xl bg-[#10121f] border ${border} flex items-center gap-4 group hover:border-opacity-40 transition-all duration-300`}>
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <div className={`bg-gradient-to-br ${color} bg-clip-text`}>
                    <Icon className={`w-5 h-5 bg-gradient-to-br ${color} [&>path]:fill-current text-transparent`} style={{ color: "transparent", backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{label}</p>
                  <p className="text-white font-bold text-xl capitalize">{value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Column: Blogs & Questions */}
          <div className="flex flex-col gap-6">
            {/* Blog Posts */}
            <motion.div {...fadeIn(0.25)}>
              <div className="bg-[#10121f] border border-white/7 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-bold text-lg">Your Blogs</h2>
                  <Link
                    to="/create-blog"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 shadow-lg shadow-indigo-500/20 transition-all duration-200"
                  >
                    <FiPlusCircle className="w-3.5 h-3.5" />
                    New Blog
                  </Link>
                </div>

                {blogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 bg-white/4 rounded-2xl flex items-center justify-center mb-4">
                      <FiBook className="w-6 h-6 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm mb-4">You haven't written any blogs yet.</p>
                    <Link
                      to="/create-blog"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1 transition-colors"
                    >
                      Write your first blog <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {blogs.slice(0, 2).map((blog) => (
                      <Link key={blog._id} to={`/blogs/${blog._id}`}>
                        <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-white/3 border border-white/5 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-200 group">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-slate-200 font-medium text-sm group-hover:text-indigo-300 transition-colors truncate">{blog.title}</h3>
                            <p className="text-slate-600 text-xs mt-0.5 flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${blog.approved ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                            {blog.approved ? <><FiCheckCircle className="w-2.5 h-2.5" /> Published</> : <><FiClock className="w-2.5 h-2.5" /> Pending</>}
                          </span>
                        </div>
                      </Link>
                    ))}
                    {blogs.length > 2 && (
                      <Link to="/blogs" className="block text-center text-indigo-400 hover:text-indigo-300 text-sm font-medium pt-2 transition-colors">
                        View all {blogs.length} blogs →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Questions Posts */}
            <motion.div {...fadeIn(0.3)}>
              <div className="bg-[#10121f] border border-white/7 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-bold text-lg">Your Questions</h2>
                  <Link
                    to="/questions/new"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 shadow-lg shadow-indigo-500/20 transition-all duration-200"
                  >
                    <FiPlusCircle className="w-3.5 h-3.5" />
                    Submit Q&A
                  </Link>
                </div>

                {questions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 bg-white/4 rounded-2xl flex items-center justify-center mb-4">
                      <FiHelpCircle className="w-6 h-6 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm mb-4">You haven't submitted any questions yet.</p>
                    <Link
                      to="/questions/new"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1 transition-colors"
                    >
                      Submit your first question <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {questions.slice(0, 2).map((q) => (
                      <div key={q._id} className="p-3.5 rounded-xl bg-white/3 border border-white/5 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-slate-200 font-medium text-sm leading-relaxed">{q.question}</h3>
                          </div>
                          <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${q.approved ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                            {q.approved ? <><FiCheckCircle className="w-2.5 h-2.5" /> Approved</> : <><FiClock className="w-2.5 h-2.5" /> Pending</>}
                          </span>
                        </div>
                        <div className="text-slate-500 text-xs flex items-center gap-2">
                          <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider text-[9px] font-bold">{q.company}</span>
                          <span className="bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider text-[9px] font-bold">{q.difficulty}</span>
                        </div>
                      </div>
                    ))}
                    {questions.length > 2 && (
                      <Link to="/questions" className="block text-center text-indigo-400 hover:text-indigo-300 text-sm font-medium pt-2 transition-colors">
                        View all {questions.length} questions →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Account Settings */}
          <motion.div {...fadeIn(0.32)}>
            <div className="bg-[#10121f] border border-white/7 rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-5">Account Info</h2>
              <div className="space-y-3">
                {[
                  { label: "Full Name", value: user?.name },
                  { label: "Email", value: user?.email },
                  { label: "Roll Number", value: user?.rollNumber || "—" },
                  { label: "Role", value: user?.role },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between p-3.5 rounded-xl bg-white/3 border border-white/5">
                    <div>
                      <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-wider">{label}</p>
                      <p className="text-slate-200 font-medium text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}

                {user?.role === "Admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/20 hover:bg-amber-500/12 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <FiSettings className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold text-sm">Admin Panel</span>
                    </div>
                    <FiArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}