import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { getBlogById } from '../services/blogs'
import { FiArrowLeft, FiEye, FiBookmark, FiCalendar, FiTag } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function BlogDetails() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id)
        setBlog(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlog()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">Error loading blog</h3>
        <p className="mt-2 text-gray-500">{error}</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">Blog not found</h3>
        <Link to="/blogs" className="mt-4 inline-block text-primary hover:underline">
          Back to Blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiEye className="mr-2" />
                <span>{blog.views} views</span>
              </div>
            </div>
            
            <button className="flex items-center text-gray-600 hover:text-primary mb-2">
              <FiBookmark className="mr-2" />
              <span>Save</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                <FiTag className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="prose max-w-none bg-white p-6 rounded-lg shadow-sm"
        >
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </motion.div>
        
        {blog.author && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-8 p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                {blog.author.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">{blog.author.name}</h4>
                <p className="text-gray-600">Author</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}