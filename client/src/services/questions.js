import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getQuestions = async (company, difficulty) => {
  try {
    const params = {};
    if (company) params.company = company;
    if (difficulty) params.difficulty = difficulty;

    const response = await axios.get(`${BASE_URL}/api/questions`, {
      params,
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

export const submitQuestion = async (questionData) => {
  const response = await axios.post(`${BASE_URL}/api/questions`, questionData, {
    withCredentials: true,
  });
  return response.data;
};

export const approveQuestion = async (id) => {
  const response = await axios.put(`${BASE_URL}/api/questions/${id}/approve`, {}, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/questions/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getPendingQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/questions/pending`, {
      withCredentials: true,
    });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching pending questions:', error);
    return [];
  }
};
