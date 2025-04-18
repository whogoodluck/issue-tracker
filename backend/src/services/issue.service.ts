import { prisma } from '../lib/db'
import { Issue, Priority, Status } from '../types/issue'

async function createNew(issue: Issue) {
  return prisma.issue.create({
    data: issue
  })
}

interface GetAll {
  status?: Status
  priority?: Priority
}

async function getAll({ status, priority }: GetAll) {
  const whereClause: any = {}

  if (status) whereClause.status = status
  if (priority) whereClause.priority = priority

  return prisma.issue.findMany({
    where: whereClause,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

async function getById(id: number) {
  return prisma.issue.findUnique({
    where: {
      id
    }
  })
}

async function deleteById(id: number) {
  return prisma.issue.delete({
    where: {
      id
    }
  })
}

async function updateById(id: number, issue: Issue) {
  return prisma.issue.update({
    where: {
      id
    },
    data: issue
  })
}

export default {
  createNew,
  getAll,
  getById,
  deleteById,
  updateById
}
