import { useEffect, useState } from 'react'
import { getIssues } from '@/actions/issue'
import { useIssue } from '@/providers/issue-provider'
import { Priority, Status } from '@/validators/issue-schema'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import IssueCard from '@/components/issue-card'
import Loader from '@/components/loader'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { issues, setIssues } = useIssue()
  const [priority, setIpriority] = useState<Priority>()
  const [status, setStatus] = useState<Status>()

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true)
        const res = await getIssues({})
        setIssues(res.issues)
      } catch (error) {
        console.log('err', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchIssues()
  }, [setIssues])

  const handleSelectStatus = async (value: Status) => {
    setStatus(value)
    try {
      setIsLoading(true)
      const res = await getIssues({ status: value, priority })
      setIssues(res.issues)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectPriority = async (value: Priority) => {
    setIpriority(value)
    try {
      setIsLoading(true)
      const res = await getIssues({ status, priority: value })
      setIssues(res.issues)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='p-4'>
      <div className='flex items-center justify-between gap-4 px-8'>
        <h1 className='text-primary text-3xl font-semibold'></h1>
        <div className='flex gap-4'>
          <Select onValueChange={handleSelectStatus}>
            <SelectTrigger className='w-full cursor-pointer'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Status).map(status => (
                <SelectItem
                  className='cursor-pointer'
                  key={status}
                  value={status}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSelectPriority}>
            <SelectTrigger className='w-full cursor-pointer'>
              <SelectValue placeholder='Select priority' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Priority).map(priority => (
                <SelectItem
                  className='cursor-pointer'
                  key={priority}
                  value={priority}
                >
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <Loader size='md' />
      ) : (
        <div className='flex w-full flex-col gap-4 py-4'>
          {issues.map((issue, index) => (
            <IssueCard key={index} issue={issue} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
