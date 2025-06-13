import axios from 'axios'

export const getProfile = async () => {
  const response = await axios.get('/api/auth/me', { withCredentials: true })
  return response.data
}