import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/api/auth/me', { withCredentials: true })
        setUser(data.user)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true })
      setUser(data.user)
      toast.success('Logged in successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed')
    }
  }

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post('/api/auth/signup', { name, email, password }, { withCredentials: true })
      setUser(data.user)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Registration failed')
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true })
      setUser(null)
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)