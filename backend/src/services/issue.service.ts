import { prisma } from '../lib/db'
import { Issue } from '../types/issue'

async function createNew(issue: Issue) {
  return prisma.issue.create({
    data: issue
  })
}

async function getAll() {
  return prisma.issue.findMany()
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
