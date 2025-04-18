import { IssueFormSchema } from '@/validators/issue-schema'
import axios from 'axios'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/issues`

export const createIssue = async (issue: IssueFormSchema) => {
  const response = await axios.post(apiUrl, issue)
  return response.data
}

export const getIssues = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}

export const getIssue = async (id: number) => {
  const response = await axios.get(`${apiUrl}/${id}`)
  return response.data
}

export const deleteIssue = async (id: number) => {
  const response = await axios.delete(`${apiUrl}/${id}`)
  return response.data
}

export const updateIssue = async (id: number, issue: IssueFormSchema) => {
  const response = await axios.put(`${apiUrl}/${id}`, issue)
  return response.data
}
