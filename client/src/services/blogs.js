import axios from 'axios'

export const getBlogs = async () => {
  try {
    const response = await axios.get('/api/blogs', { withCredentials: true });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogById = async (id) => {
  const response = await axios.get(`/api/blogs/${id}`)
  return response.data
}

export const createBlog = async (blogData) => {
  const response = await axios.post('/api/blogs', blogData, { withCredentials: true })
  return response.data
}

export const approveBlog = async (id) => {
  const response = await axios.put(`/api/blogs/${id}/approve`, {}, { withCredentials: true })
  return response.data
}

export const deleteBlog = async (id) => {
  const response = await axios.delete(`/api/blogs/${id}`, { withCredentials: true })
  return response.data
}

export const getPendingBlogs = async () => {
  try {
    const response = await axios.get('/api/blogs/pending', { withCredentials: true });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching pending blogs:', error);
    return [];
  }
};