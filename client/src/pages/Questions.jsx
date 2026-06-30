import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getQuestions } from "../services/questions";
import { FiSearch, FiFilter, FiPlus, FiHelpCircle, FiChevronDown, FiChevronUp, FiBriefcase, FiBarChart2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const difficultyConfig = {
  Easy: "bg-green-500/10 text-green-400 border-green-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20",
};

function QuestionCard({ question, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-[#10121f] border border-white/7 rounded-2xl overflow-hidden hover:border-indigo-500/20 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 group min-h-[115px]"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
              <FiBriefcase className="w-2.5 h-2.5" /> {question.company}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${difficultyConfig[question.difficulty] || difficultyConfig.Easy}`}>
              <FiBarChart2 className="w-2.5 h-2.5" /> {question.difficulty}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm leading-relaxed group-hover:text-indigo-300 transition-colors">
            {question.question}
          </h3>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/4 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all">
          {open ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mb-4" />
              <p className="text-slate-400 text-sm leading-relaxed">
                <span className="text-indigo-400 font-semibold">Answer: </span>
                {question.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ company: "", difficulty: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => {
    const w = window.innerWidth;
    if (w < 768) return 8; // Mobile
    if (w < 1024) return 10; // Tablet
    return 12; // Laptop / Desktop
  });
  const [userSelectedSize, setUserSelectedSize] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(filters.company, filters.difficulty);
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [filters]);

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
  }, [searchTerm, filters]);

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const displayedQuestions = filteredQuestions.slice(
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

  const selectClass = "px-3 py-2.5 bg-[#131524] border border-white/8 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer [&>option]:bg-[#10121f]";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-5">
            <FiHelpCircle className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Interview Prep</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Interview <span className="gradient-text">Q&A Library</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Ace your next technical interview with curated questions from top companies.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions, answers, or companies..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#131524] border border-white/8 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-3.5 h-3.5" />
                <select name="company" value={filters.company} onChange={handleFilterChange} className={`${selectClass} pl-9`}>
                  <option value="">All Companies</option>
                  <option value="TCS">TCS</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                </select>
              </div>
              <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange} className={selectClass}>
                <option value="">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <Link
                to="/questions/new"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 shadow-lg shadow-indigo-500/20 transition-all whitespace-nowrap"
              >
                <FiPlus className="w-4 h-4" /> Submit Q&A
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Results info */}
        {!loading && (
          <p className="text-slate-600 text-xs font-medium mb-5 uppercase tracking-wider">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 bg-white/3 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiHelpCircle className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No questions found</h3>
            <p className="text-slate-600 text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedQuestions.map((question, index) => (
                <QuestionCard key={question._id} question={question} index={index} />
              ))}
            </div>

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
                      className={`w-10 h-10 rounded-xl border font-semibold text-sm transition-all duration-200 ${currentPage === page
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
                  Results: {Math.min((currentPage - 1) * pageSize + 1, filteredQuestions.length)} -{" "}
                  {Math.min(currentPage * pageSize, filteredQuestions.length)} of {filteredQuestions.length}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}