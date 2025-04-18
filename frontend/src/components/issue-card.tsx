import { Dot } from 'lucide-react'
import { Link } from 'react-router-dom'

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
        <Link to={`/issues/${issue.id}`}>
          <CardTitle className='line-clamp-2'>{issue.title}</CardTitle>
        </Link>
        <ManageIssue issue={issue} />
      </CardHeader>
      <CardContent>
        <Link to={`/tasks/${issue.id}`}>
          <article className='text-muted-foreground line-clamp-3 text-sm'>
            {issue.description}
          </article>
        </Link>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <div
          className={cn(
            'flex items-center text-sm font-semibold text-[#28a745]',
            {
              'text-[#fd7e14]': issue.status === Status.IN_PROGRESS,
              'text-[#6c757d]': issue.status === Status.CLOSED
            }
          )}
        >
          <Dot size={24} />
          {issue.status}
        </div>
        <div
          className={cn(
            'flex items-center text-sm font-semibold text-[#17a2b8]',
            {
              'text-[#6495ED]': issue.priority === Priority.MEDIUM,
              'text-[#ff5722]': issue.priority === Priority.HIGH
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
