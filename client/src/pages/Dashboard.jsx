import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProfile } from '../services/auth'
import { getBlogs } from '../services/blogs'
import { FiBook, FiBookmark, FiUser, FiSettings } from 'react-icons/fi'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, blogsData] = await Promise.all([
          getProfile(),
          getBlogs()
        ])
        
        setUser(profileData)
        setBlogs(blogsData.filter(blog => blog.author?._id === profileData._id))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                <FiUser className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-500">Account Type</h3>
                <p className="text-2xl font-semibold text-gray-900 capitalize">{user?.role.toLowerCase()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-secondary"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary mr-4">
                <FiBook className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-500">Your Blogs</h3>
                <p className="text-2xl font-semibold text-gray-900">{blogs.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500 mr-4">
                <FiBookmark className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-500">Saved Items</h3>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Recent Blogs</h2>
              <Link
                to="/create-blog"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Create New
              </Link>
            </div>
            
            {blogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't created any blogs yet</p>
                <Link
                  to="/create-blog"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Create Your First Blog
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.slice(0, 3).map(blog => (
                  <div key={blog._id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-900">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.content.substring(0, 100)}...</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        blog.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.approved ? 'Published' : 'Pending Approval'}
                      </span>
                    </div>
                  </div>
                ))}
                {blogs.length > 3 && (
                  <div className="text-center mt-4">
                    <Link
                      to="/blogs"
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      View all your blogs
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <button className="text-sm text-primary hover:text-primary-dark font-medium">
                  Change
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Password</h3>
                  <p className="text-sm text-gray-500">••••••••</p>
                </div>
                <button className="text-sm text-primary hover:text-primary-dark font-medium">
                  Change
                </button>
              </div>
              {user?.role === 'Admin' && (
                <Link
                  to="/admin"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group"
                >
                  <div className="flex items-center">
                    <FiSettings className="mr-2 text-gray-500 group-hover:text-primary" />
                    <h3 className="font-medium text-gray-900 group-hover:text-primary">Admin Panel</h3>
                  </div>
                  <span className="text-sm text-primary font-medium">Access</span>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}