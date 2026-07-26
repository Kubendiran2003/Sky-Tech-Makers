import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Use environment-based API base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUser(data.user);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/forgot-password`, { email });
      toast.success(data.msg || 'Password reset email sent!');
      return { success: true, message: data.msg };
    } catch (error) {
      const msg = error.response?.data?.msg || 'Failed to send password reset email';
      toast.error(msg);
      throw new Error(msg);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/auth/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );
      setUser(null);
      toast.success(data.msg || 'Password updated successfully! Please sign in with your new password.');
      navigate('/login');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.msg || 'Password reset failed';
      toast.error(msg);
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
