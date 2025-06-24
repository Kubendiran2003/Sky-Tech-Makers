import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/blogs`, { withCredentials: true });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlogById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/blogs/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await axios.post(`${BASE_URL}/api/blogs`, blogData, { withCredentials: true });
  return response.data;
};

export const approveBlog = async (id) => {
  const response = await axios.put(`${BASE_URL}/api/blogs/${id}/approve`, {}, { withCredentials: true });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/blogs/${id}`, { withCredentials: true });
  return response.data;
};

export const getPendingBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/blogs/pending`, { withCredentials: true });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching pending blogs:', error);
    return [];
  }
};
