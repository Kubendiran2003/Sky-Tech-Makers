import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { FiHome, FiLogIn, FiLogOut, FiUser, FiPlusCircle, FiSettings } from 'react-icons/fi'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">Sky Tech Makers</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-6">
            <NavLink 
              to="/home" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium flex items-center ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`
              }
            >
              <FiHome className="mr-1" /> Home
            </NavLink>
            <NavLink 
              to="/blogs" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`
              }
            >
              Blogs
            </NavLink>
            <NavLink 
              to="/questions" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`
              }
            >
              Interview Q&A
            </NavLink>
            <NavLink 
              to="/tools" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`
              }
            >
              Tools
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                  >
                    <FiUser className="h-5 w-5" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </motion.div>
                
                {user.role === 'Admin' && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/admin" 
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                    >
                      <FiSettings className="h-5 w-5" />
                      <span className="hidden md:inline">Admin</span>
                    </Link>
                  </motion.div>
                )}
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                  >
                    <FiLogIn className="h-5 w-5" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/register" 
                    className="hidden md:flex items-center space-x-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark"
                  >
                    <FiPlusCircle className="h-5 w-5" />
                    <span>Register</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}