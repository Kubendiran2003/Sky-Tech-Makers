import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getBlogs,
  getPendingBlogs,
  approveBlog,
  deleteBlog,
} from "../services/blogs";
import {
  getQuestions,
  getPendingQuestions,
  approveQuestion,
  deleteQuestion,
} from "../services/questions";
import {
  FiCheck,
  FiTrash2,
  FiAlertTriangle,
  FiRefreshCw,
  FiCopy,
  FiMail,
  FiAward,
  FiBriefcase,
  FiActivity,
  FiClock,
  FiBookOpen,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAdminWinners } from "../services/challenges";
import { toast } from "react-toastify";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("blogs");
  const [allBlogs, setAllBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [blogsData, pendingBlogData, questionsData, pendingQuestionData, winnersData] = await Promise.all([
        getBlogs(),
        getPendingBlogs(),
        getQuestions(),
        getPendingQuestions(),
        getAdminWinners().catch((err) => {
          console.error("Error fetching challenge winners:", err);
          return [];
        }),
      ]);

      setAllBlogs(blogsData);
      setPendingBlogs(pendingBlogData);
      setAllQuestions(questionsData);
      setPendingQuestions(pendingQuestionData);
      setWinners(winnersData);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "Admin") {
      fetchData();
    }
  }, [user]);

  const handleApproveBlog = async (id) => {
    try {
      await approveBlog(id);
      setPendingBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setAllBlogs((prev) =>
        prev.map((blog) => (blog._id === id ? { ...blog, approved: true } : blog))
      );
      toast.success("Blog approved successfully!");
    } catch (err) {
      console.error("Error approving blog:", err);
      toast.error("Failed to approve blog.");
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setPendingBlogs((prev) => prev.filter((blog) => blog._id !== id));
      setAllBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Failed to delete blog.");
    }
  };

  const handleApproveQuestion = async (id) => {
    try {
      await approveQuestion(id);
      setPendingQuestions((prev) => prev.filter((q) => q._id !== id));
      setAllQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, approved: true } : q))
      );
      toast.success("Question approved successfully!");
    } catch (err) {
      console.error("Error approving question:", err);
      toast.error("Failed to approve question.");
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setPendingQuestions((prev) => prev.filter((q) => q._id !== id));
      setAllQuestions((prev) => prev.filter((q) => q._id !== id));
      toast.success("Question deleted successfully!");
    } catch (err) {
      console.error("Error deleting question:", err);
      toast.error("Failed to delete question.");
    }
  };

  const handleRefresh = () => {
    setError(null);
    fetchData();
  };

  if (user?.role !== "Admin") {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <div className="relative glass-strong p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-white/8 z-10">
          <FiAlertTriangle className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Admin Access Required</h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            You don't have permission to access this workspace.
          </p>
          <p className="text-xs text-slate-500">
            Please login with an administrator account to manage submissions.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const difficultyConfig = {
    Easy: "bg-green-500/10 text-green-400 border-green-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const tabBtnClass = (tabName) =>
    `flex items-center gap-2 py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
      activeTab === tabName
        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5"
        : "text-slate-400 hover:text-slate-300 hover:bg-white/5 border border-transparent"
    }`;

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Manage content submissions, approvals and prize winners</p>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#131524] border border-white/8 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/8 border border-red-500/20 rounded-xl flex items-center"
          >
            <FiAlertTriangle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-red-400">Loading Error</h3>
              <p className="text-xs text-red-500 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Tabs Bar */}
        <div className="bg-[#10121f] border border-white/7 rounded-2xl p-1.5 mb-8 flex flex-col sm:flex-row gap-1">
          <button onClick={() => setActiveTab("blogs")} className={tabBtnClass("blogs")}>
            Blogs
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-400 font-bold">
              {pendingBlogs.length}
            </span>
          </button>
          <button onClick={() => setActiveTab("questions")} className={tabBtnClass("questions")}>
            Questions
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-400 font-bold">
              {pendingQuestions.length}
            </span>
          </button>
          <button onClick={() => setActiveTab("winners")} className={tabBtnClass("winners")}>
            Coding Winners
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-400 font-bold">
              {winners.length}
            </span>
          </button>
        </div>

        {/* Content list */}
        {activeTab === "blogs" ? (
          pendingBlogs.length === 0 ? (
            <div className="text-center py-16 bg-[#10121f] border border-white/7 rounded-2xl">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">No blogs pending approval</h3>
              <p className="text-slate-500 text-sm">All blogs have been reviewed and approved.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#10121f] border border-white/7 rounded-2xl p-6 hover:border-indigo-500/20 transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{blog.title}</h3>
                      <p className="mt-2 text-slate-400 text-sm leading-relaxed line-clamp-2">{blog.content}</p>

                      {blog.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        <span>Submitted by: {blog.author?.name || "Anonymous"}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 justify-end w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-0">
                      <button
                        onClick={() => handleApproveBlog(blog._id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-500 rounded-xl transition duration-200 shadow-lg shadow-green-600/20"
                      >
                        <FiCheck className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition duration-200 shadow-lg shadow-red-600/20"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : activeTab === "questions" ? (
          pendingQuestions.length === 0 ? (
            <div className="text-center py-16 bg-[#10121f] border border-white/7 rounded-2xl">
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">No questions pending approval</h3>
              <p className="text-slate-500 text-sm">All questions have been reviewed and approved.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingQuestions.map((question) => (
                <motion.div
                  key={question._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#10121f] border border-white/7 rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white leading-relaxed">{question.question}</h3>
                      <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                        <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block mb-1">Suggested Answer</span>
                        {question.answer}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {question.company && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                            <FiBriefcase className="w-2.5 h-2.5" /> {question.company}
                          </span>
                        )}
                        {question.difficulty && (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${difficultyConfig[question.difficulty] || difficultyConfig.Easy}`}>
                            <FiActivity className="w-2.5 h-2.5" /> {question.difficulty}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        <span>Submitted by: {question.submittedBy?.name || "Anonymous"}</span>
                        <span>•</span>
                        <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 justify-end w-full md:w-auto pt-4 md:pt-0 border-t border-white/5 md:border-0">
                      <button
                        onClick={() => handleApproveQuestion(question._id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-500 rounded-xl transition duration-200 shadow-lg shadow-green-600/20"
                      >
                        <FiCheck className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question._id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition duration-200 shadow-lg shadow-red-600/20"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-[#10121f] border border-white/7 rounded-2xl p-6 overflow-x-auto scrollbar-thin">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiAward className="text-indigo-400" /> Daily Challenge Leaders & Winners Details
              </h2>
            </div>
            {winners.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">
                No users have completed any challenges yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm text-slate-300 min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/2 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-4 rounded-l-xl">Rank</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Roll Number</th>
                    <th className="py-3 px-4 text-center">Progress</th>
                    <th className="py-3 px-4 text-center">Total Time</th>
                    <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {winners.map((entry) => (
                    <tr key={entry.user.id} className="hover:bg-white/2 transition duration-200">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {entry.rank === 1 ? "🥇 1" : entry.rank === 2 ? "🥈 2" : entry.rank === 3 ? "🥉 3" : entry.rank}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{entry.user.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{entry.user.email}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{entry.user.rollNumber}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-indigo-400">{entry.solvedCount} / 30</td>
                      <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500 flex items-center justify-center gap-1">
                        <FiClock className="w-3 h-3 text-slate-600" />
                        {Math.floor(entry.totalTime / 60)}m {entry.totalTime % 60}s
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(entry.user.email);
                              toast.success("Email copied to clipboard!");
                            }}
                            className="inline-flex items-center p-2 bg-[#131524] border border-white/8 rounded-lg text-slate-400 hover:text-white transition-all text-xs"
                            title="Copy Email"
                          >
                            <FiCopy />
                          </button>
                          <a
                            href={`mailto:${entry.user.email}?subject=Sky%20Tech%20Makers%20-%20Coding%20Challenge%20Winner!&body=Hi%20${encodeURIComponent(entry.user.name)},%0D%0A%0D%0ACongratulations%20on%20winning%20our%20daily%20coding%20challenge%20at%20Sky%20Tech%20Makers!%20Please%20reply%20to%20this%20email%20to%20coordinate%20your%20gift%20delivery.%0D%0A%0D%0ABest%20Regards,%0D%0ASky%20Tech%20Makers%20Team`}
                            className="inline-flex items-center p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs"
                            title="Email Winner"
                          >
                            <FiMail />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}