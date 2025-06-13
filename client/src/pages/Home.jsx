import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiArrowRight, FiBook, FiCode, FiTool } from 'react-icons/fi'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to Sky Tech Makers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          >
            Your central hub for tech blogs, interview resources, and developer tools.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to={user ? '/dashboard' : '/register'} 
              className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-primary mb-4">
                <FiBook className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tech Blogs</h3>
              <p className="text-gray-600">
                Read and share technical articles on various programming topics, frameworks, and best practices.
              </p>
              <Link to="/blogs" className="mt-4 inline-block text-primary hover:underline">
                Browse Blogs
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-primary mb-4">
                <FiCode className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Interview Q&A</h3>
              <p className="text-gray-600">
                Prepare for technical interviews with questions categorized by company and difficulty level.
              </p>
              <Link to="/questions" className="mt-4 inline-block text-primary hover:underline">
                Explore Questions
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-primary mb-4">
                <FiTool className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Developer Tools</h3>
              <p className="text-gray-600">
                Useful tools to make your development workflow easier and more efficient.
              </p>
              <Link to="/tools" className="mt-4 inline-block text-primary hover:underline">
                Try Tools
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sign up now to start contributing blogs, saving resources, and accessing exclusive features.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center px-6 py-3 bg-primary rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              Create Free Account
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}