import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const formatJson = async (jsonString) => {
  const response = await axios.post(`${BASE_URL}/api/tools/json-formatter`, {
    json: jsonString,
  });
  return response.data;
};
