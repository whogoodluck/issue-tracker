import { useEffect, useState } from 'react'
import { getIssue } from '@/actions/issue'
import { Priority, Status } from '@/validators/issue-schema'
import { Dot } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Issue } from '@/types/issue'
import { cn, formatTimeAgo } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Loader from '@/components/loader'
import ManageIssue from '@/components/manage-issue'

function IssueDetails() {
  const params = useParams()
  const issueId = Number(params.id)
  const [issue, setIssue] = useState<Issue | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setIsLoading(true)
        const res = await getIssue(issueId)
        setIssue(res.issue)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchIssue()
  }, [issueId])

  if (isLoading) return <Loader />

  if (!issue) return

  const statusColor: Record<Status, string> = {
    OPEN: 'text-[#0a4ad3] bg-[#e5edfb]',
    IN_PROGRESS: 'text-[#28a745] bg-[#e4f5e9]',
    CLOSED: 'text-[#6c757d] bg-[#f1f3f5]'
  }

  const priorityColor: Record<Priority, string> = {
    LOW: 'text-[#0f766e] bg-[#ccfbf1]',
    MEDIUM: 'text-[#f5a511] bg-[#fff3cd]',
    HIGH: 'text-[#dc2626] bg-[#fee2e2]'
  }

  return (
    <section className='mx-auto max-w-2xl p-4 pt-10'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold'>{issue.title}</h1>

        <ManageIssue issue={issue} />
      </div>

      <Separator />

      <div className='mt-4 space-y-6'>
        <article className='text-muted-foreground text-base'>
          {issue.description}
        </article>

        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-2'>
            <Badge className={cn(statusColor[issue.status])}>
              {issue.status}
            </Badge>
            <Badge className={cn(priorityColor[issue.priority])}>
              {issue.priority}
            </Badge>
          </div>
          <div className='flex items-center text-sm'>
            <Dot size={24} className='text-foreground' />
            {formatTimeAgo(new Date(issue.createdAt))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default IssueDetails
