import { IssueFormSchema, Priority, Status } from '@/validators/issue-schema'
import axios from 'axios'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/issues`

export const createIssue = async (issue: IssueFormSchema) => {
  const response = await axios.post(apiUrl, issue)
  return response.data
}

interface GetIssues {
  status?: Status
  priority?: Priority
}

export const getIssues = async ({ status, priority }: GetIssues) => {
  if (status && priority) {
    const response = await axios.get(
      `${apiUrl}?status=${status}&priority=${priority}`
    )
    return response.data
  }
  if (status) {
    const response = await axios.get(`${apiUrl}?status=${status}`)
    return response.data
  }
  if (priority) {
    const response = await axios.get(`${apiUrl}?priority=${priority}`)
    return response.data
  }
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
