import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getQuestions } from "../services/questions";
import { FiSearch, FiFilter, FiPlus, FiHelpCircle, FiChevronDown, FiChevronUp, FiBriefcase, FiBarChart2 } from "react-icons/fi";
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
        className="w-full text-left p-5 flex items-start justify-between gap-4 group"
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

  const selectClass = "px-3 py-2.5 bg-[#131524] border border-white/8 rounded-xl text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer [&>option]:bg-[#10121f]";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 bg-white/3 rounded-2xl animate-pulse" />
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
          <div className="space-y-3">
            {filteredQuestions.map((question, index) => (
              <QuestionCard key={question._id} question={question} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}