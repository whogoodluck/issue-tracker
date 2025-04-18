import { RequestHandler, Router } from 'express'
import issueController from '../controllers/issue.controller'

const issueRoutes = Router()

issueRoutes.post('/', issueController.createNewIssue)
issueRoutes.get('/', issueController.getAllIssues as RequestHandler)
issueRoutes.get('/:id', issueController.getIssueById)
issueRoutes.delete('/:id', issueController.deleteIssueById)
issueRoutes.put('/:id', issueController.updateIssueById)

export default issueRoutes
