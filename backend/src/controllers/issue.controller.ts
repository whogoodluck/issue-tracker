import { NextFunction, Request, Response } from 'express'
import issueService from '../services/issue.service'
import HttpError from '../utils/http-error'

async function createNewIssue(req: Request, res: Response, next: NextFunction) {
  const { title, description, status, priority } = req.body
  try {
    const issue = await issueService.createNew({ title, description, status, priority })
    res.status(201).json({ message: 'Issue created', issue })
  } catch (err) {
    next(err)
  }
}

async function getAllIssues(_req: Request, res: Response, next: NextFunction) {
  try {
    const issues = await issueService.getAll()
    res.status(200).json({ message: 'Issues fetched', issues })
  } catch (err) {
    next(err)
  }
}

async function getIssueById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  try {
    const issue = await issueService.getById(Number(id))

    if (!issue) {
      throw new HttpError(404, 'Issue not found')
    }

    res.status(200).json({ message: 'Issue fetched', issue })
  } catch (err) {
    next(err)
  }
}

async function deleteIssueById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  try {
    const issue = await issueService.deleteById(Number(id))

    if (!issue) {
      throw new HttpError(404, 'Issue not found')
    }

    res.status(200).json({ message: 'Issue deleted', issue })
  } catch (err) {
    next(err)
  }
}

async function updateIssueById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  const { title, description, status, priority } = req.body
  try {
    const issue = await issueService.updateById(Number(id), {
      title,
      description,
      status,
      priority
    })

    if (!issue) {
      throw new HttpError(404, 'Issue not found')
    }

    res.status(200).json({ message: 'Issue updated', issue })
  } catch (err) {
    next(err)
  }
}

export default {
  createNewIssue,
  getAllIssues,
  getIssueById,
  deleteIssueById,
  updateIssueById
}
