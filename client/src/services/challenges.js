import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getChallengeStatus = async () => {
  const response = await axios.get(`${BASE_URL}/api/challenges/status`, {
    withCredentials: true,
  });
  return response.data;
};

export const getChallenge = async (day) => {
  const response = await axios.get(`${BASE_URL}/api/challenges/${day}`, {
    withCredentials: true,
  });
  return response.data;
};

export const runCode = async (day, code, language) => {
  const response = await axios.post(
    `${BASE_URL}/api/challenges/run`,
    { day, code, language },
    { withCredentials: true }
  );
  return response.data;
};

export const submitCode = async (day, code, language, timeTaken) => {
  const response = await axios.post(
    `${BASE_URL}/api/challenges/submit`,
    { day, code, language, timeTaken },
    { withCredentials: true }
  );
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get(`${BASE_URL}/api/challenges/leaderboard`);
  return response.data;
};

export const getAdminWinners = async () => {
  const response = await axios.get(`${BASE_URL}/api/challenges/admin/winners`, {
    withCredentials: true,
  });
  return response.data;
};

export const disqualifyChallenge = async (day) => {
  const response = await axios.post(
    `${BASE_URL}/api/challenges/disqualify`,
    { day },
    { withCredentials: true }
  );
  return response.data;
};
