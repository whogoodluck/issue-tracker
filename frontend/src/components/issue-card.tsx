import { Dot } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { Issue } from '@/types/issue'
import { cn, formatTimeAgo } from '@/lib/utils'

import ManageIssue from './manage-issue'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface IssueCardProps {
  issue: Issue
}

enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

function IssueCard({ issue }: IssueCardProps) {
  return (
    <Card className=''>
      <CardHeader className='flex items-center justify-between'>
        <NavLink to={`/issues/${issue.id}`}>
          <CardTitle className='line-clamp-2'>{issue.title}</CardTitle>
        </NavLink>
        <ManageIssue issue={issue} />
      </CardHeader>
      <CardContent>
        <NavLink to={`/issues/${issue.id}`}>
          <article className='text-muted-foreground line-clamp-3 text-sm'>
            {issue.description}
          </article>{' '}
        </NavLink>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <div
          className={cn(
            'flex items-center text-sm font-semibold text-[#0a4ad3]',
            {
              'text-[#28a745]': issue.status === Status.IN_PROGRESS,
              'text-[#6c757d]': issue.status === Status.CLOSED
            }
          )}
        >
          <Dot size={24} />
          {issue.status}
        </div>
        <div
          className={cn(
            'flex items-center text-sm font-semibold text-[#0f766e]',
            {
              'text-[#f5a511]': issue.priority === Priority.MEDIUM,
              'text-[#dc2626]': issue.priority === Priority.HIGH
            }
          )}
        >
          <Dot size={24} />
          {issue.priority}
        </div>
        <div className='flex items-center text-sm'>
          <Dot size={24} className='text-foreground' />
          {formatTimeAgo(new Date(issue.createdAt))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default IssueCard
