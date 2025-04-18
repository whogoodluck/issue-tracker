import { useEffect, useState } from 'react'
import { getIssues } from '@/actions/issue'
import { useIssue } from '@/providers/issue-provider'

import IssueCard from '@/components/issue-card'
import Loader from '@/components/loader'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { issues, setIssues } = useIssue()

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true)
        const res = await getIssues()
        setIssues(res.issues)
      } catch (error) {
        console.log('err', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchIssues()
  }, [setIssues])

  return (
    <section className='p-4'>
      {isLoading ? (
        <Loader />
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
