import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../services/blogs";
import { FiSearch, FiBook, FiX, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    const w = window.innerWidth;
    if (w < 768) return 8; // Mobile
    if (w < 1024) return 10; // Tablet
    return 12; // Laptop / Desktop
  });
  const [userSelectedSize, setUserSelectedSize] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (userSelectedSize) return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setPageSize(8);
      else if (w < 1024) setPageSize(10);
      else setPageSize(12);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userSelectedSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBlogs.length / pageSize) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-5">
            <FiBook className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Tech Articles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Explore <span className="gradient-text">Tech Blogs</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Deep-dive articles, tutorials, and insights from the Sky Tech Makers community.
          </p>
        </motion.div>

        {/* Search & Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 px-4 sm:px-0"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                className="w-full pl-11 pr-10 py-3 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <Link
              to="/create-blog"
              className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all whitespace-nowrap"
            >
              <FiPlus className="w-4 h-4" /> Create Blog
            </Link>
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white/3 border border-white/6 h-72 animate-pulse" />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiBook className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No blogs found</h3>
            <p className="text-slate-600 text-sm">Try adjusting your search or check back later.</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedBlogs.map((blog) => (
                <motion.div key={blog._id} variants={itemFade}>
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
              {/* Centered page numbers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-white/8 bg-[#131524] text-slate-400 flex items-center justify-center hover:bg-indigo-500/10 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all duration-200"
                  aria-label="Previous Page"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {getPageNumbers().map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-slate-600 font-semibold select-none">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                        currentPage === page
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                          : "border-white/8 bg-[#131524] text-slate-400 hover:bg-indigo-500/10 hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-white/8 bg-[#131524] text-slate-400 flex items-center justify-center hover:bg-indigo-500/10 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all duration-200"
                  aria-label="Next Page"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Selector and count row */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setUserSelectedSize(true);
                      setCurrentPage(1);
                    }}
                    className="bg-[#131524] border border-white/8 rounded-lg px-2.5 py-1.5 text-slate-300 font-semibold focus:outline-none focus:border-indigo-500/40 transition-colors"
                  >
                    <option value={8}>8</option>
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={20}>20</option>
                  </select>
                  <span>records per page</span>
                </div>
                <div>
                  Results: {Math.min((currentPage - 1) * pageSize + 1, filteredBlogs.length)} -{" "}
                  {Math.min(currentPage * pageSize, filteredBlogs.length)} of {filteredBlogs.length}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}