import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiEye, FiArrowRight, FiUser, FiTag } from "react-icons/fi";

export default function BlogCard({ blog }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-[#10121f] border border-white/7 rounded-2xl overflow-hidden hover:border-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/8 transition-all duration-300"
    >
      <Link to={`/blogs/${blog._id}`} className="block p-6">
        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider"
            >
              <FiTag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-indigo-300 transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5">
          {blog.content?.replace(/<[^>]+>/g, "").substring(0, 160)}...
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <FiUser className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-500 text-xs font-medium truncate max-w-[100px]">
              {blog.author?.name || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-600 text-xs">
              <FiEye className="w-3 h-3" />
              {blog.views ?? 0}
            </span>
            <span className="flex items-center gap-1 text-indigo-400 text-xs font-semibold group-hover:gap-2 transition-all duration-200">
              Read <FiArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}