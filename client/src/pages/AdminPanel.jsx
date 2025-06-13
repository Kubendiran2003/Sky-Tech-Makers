import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  getBlogs,
  getPendingBlogs,
  approveBlog,
  deleteBlog
} from '../services/blogs';
import {
  getQuestions,
  getPendingQuestions,
  approveQuestion,
  deleteQuestion
} from '../services/questions';
import {
  FiCheck,
  FiTrash2,
  FiAlertTriangle,
  FiRefreshCw
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [allBlogs, setAllBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both blogs and pending blogs in parallel
      const [blogsData, pendingBlogData, questionsData] = await Promise.all([
        getBlogs(),
        getPendingBlogs(),
        getQuestions(),
        getPendingQuestions()
      ]);

      setAllBlogs(blogsData);
    setPendingBlogs(pendingBlogData);
    setAllQuestions(questionsData);
    setPendingQuestions(pendingQuestionData);
  } catch (err) {
    console.error('Error fetching admin data:', err);
    setError('Failed to load admin data. Please try again.');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (user?.role === 'Admin') {
      fetchData();
    }
  }, [user]);

  const handleApproveBlog = async (id) => {
    try {
      await approveBlog(id);
      setPendingBlogs(prev => prev.filter(blog => blog._id !== id));
      setAllBlogs(prev =>
        prev.map(blog => (blog._id === id ? { ...blog, approved: true } : blog))
      );
    } catch (err) {
      console.error('Error approving blog:', err);
      setError('Failed to approve blog. Please try again.');
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setPendingBlogs(prev => prev.filter(blog => blog._id !== id));
      setAllBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog. Please try again.');
    }
  };

  const handleApproveQuestion = async (id) => {
    try {
      await approveQuestion(id);
      setPendingQuestions(prev => prev.filter(q => q._id !== id));
      setAllQuestions(prev =>
        prev.map(q => (q._id === id ? { ...q, approved: true } : q))
      );
    } catch (err) {
      console.error('Error approving question:', err);
      setError('Failed to approve question. Please try again.');
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setPendingQuestions(prev => prev.filter(q => q._id !== id));
      setAllQuestions(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('Failed to delete question. Please try again.');
    }
  };

  const handleRefresh = () => {
    setError(null);
    fetchData();
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md w-full">
          <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Admin Access Required</h3>
          <p className="text-gray-500 mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-400">
            Please contact an administrator if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md w-full">
          <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Error Loading Data</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gray-50 min-h-[80vh]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage content submissions and approvals</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <FiRefreshCw className={`${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded"
          >
            <div className="flex items-center">
              <FiAlertTriangle className="h-5 w-5 text-red-500 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('blogs')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'blogs'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Blogs ({pendingBlogs.length})
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'questions'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Questions ({pendingQuestions.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'blogs' ? (
          pendingBlogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <FiCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs pending approval</h3>
              <p className="text-gray-500">All blogs have been reviewed and approved.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBlogs.map(blog => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                      <p className="mt-1 text-gray-600 line-clamp-2">{blog.content?.substring(0, 200)}...</p>
                      
                      {blog.tags?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {blog.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                        <span>Submitted by: {blog.author?.name || 'Anonymous'}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col gap-2 justify-end">
                      <button
                        onClick={() => handleApproveBlog(blog._id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        ) : pendingQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FiCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions pending approval</h3>
            <p className="text-gray-500">All questions have been reviewed and approved.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingQuestions.map(question => (
              <motion.div
                key={question._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{question.question}</h3>
                    <p className="mt-1 text-gray-600">
                      <span className="font-medium">Answer:</span> {question.answer}
                    </p>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {question.company && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {question.company}
                        </span>
                      )}
                      {question.difficulty && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          question.difficulty === 'Easy' 
                            ? 'bg-green-100 text-green-800' 
                            : question.difficulty === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {question.difficulty}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      Submitted by: {question.submittedBy?.name || 'Anonymous'}
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-2 justify-end">
                    <button
                      onClick={() => handleApproveQuestion(question._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}