import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiEye, FiBookmark } from 'react-icons/fi'

export default function BlogCard({ blog }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={`/blogs/${blog._id}`}>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {blog.tags[0]}
            </span>
          </div>
          
          <p className="text-gray-600 mt-2 line-clamp-2">
            {blog.content.substring(0, 150)}...
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">By {blog.author?.name || 'Anonymous'}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-500 text-sm">
                <FiEye className="mr-1" />
                <span>{blog.views}</span>
              </div>
              <button className="text-gray-500 hover:text-primary">
                <FiBookmark />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}