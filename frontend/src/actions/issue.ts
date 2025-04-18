import axios from 'axios'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/issues`

export const getIssues = async () => {
  console.log('url', apiUrl)
  const response = await axios.get(apiUrl)
  return response.data
}

export const deleteIssue = async (id: number) => {
  const response = await axios.delete(`${apiUrl}/${id}`)
  return response.data
}
