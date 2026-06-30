import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createBlog } from "../services/blogs";
import { FiPlus, FiX, FiBook, FiArrowLeft, FiEdit3, FiTag } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.warning("Title and content are required!");
      return;
    }
    setLoading(true);
    try {
      await createBlog({ title, content, tags });
      toast.success("Blog post submitted successfully for approval!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-400 text-sm font-medium mb-8 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <FiBook className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Community Knowledge</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Create New Blog</h1>
          <p className="text-slate-500 text-sm mt-1.5">Share your tech insights, tutorials, and experiences</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-strong rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/40"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="blog-title" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Title
              </label>
              <div className="relative">
                <FiEdit3 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  id="blog-title"
                  required
                  placeholder="e.g. Mastering React Server Components"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Content
              </label>
              <textarea
                id="content"
                rows={12}
                required
                placeholder="Write your article content using Markdown formatting..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-[#080b14]/50 border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200 font-mono scrollbar-thin resize-y"
              />
              <p className="mt-1.5 text-xs text-slate-600 italic">
                Markdown formatting is fully supported (headings, lists, bold text, code snippets).
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Tags
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    id="tags"
                    placeholder="e.g. react, node, tutorials"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    className="w-full pl-10 pr-4 py-3 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-200"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              {tags.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-indigo-400 transition-colors ml-1.5"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 transition-all duration-300 ${loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiBook className="w-4 h-4" />
                    Publish Blog
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