import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProfile = async () => {
  const response = await axios.get(`${BASE_URL}/api/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};
