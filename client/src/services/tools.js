import axios from 'axios'

export const formatJson = async (jsonString) => {
  const response = await axios.post('/api/tools/json-formatter', { json: jsonString })
  return response.data
}