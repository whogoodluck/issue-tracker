import { useState } from 'react'
import { createIssue, updateIssue } from '@/actions/issue'
import { useIssue } from '@/providers/issue-provider'
import {
  issueFormSchema,
  IssueFormSchema,
  Priority,
  Status
} from '@/validators/issue-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Issue } from '@/types/issue'

import LoadingButton from './common/loading-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Textarea } from './ui/textarea'

interface IssueFormProps {
  formType?: 'create' | 'update'
  issue?: Issue
}

function IssueForm({ formType = 'create', issue }: IssueFormProps) {
  const [isPending, setIsPending] = useState(false)
  const { issues, setIssues } = useIssue()
  const navigate = useNavigate()

  const form = useForm<IssueFormSchema>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
      priority: issue?.priority || undefined,
      status: issue?.status || undefined
    }
  })

  const onSubmit = async (data: IssueFormSchema) => {
    try {
      setIsPending(true)
      if (formType === 'update' && !!issue) {
        const res = await updateIssue(issue.id, data)
        setIssues(
          issues.map(issue => (issue.id === res.issue.id ? res.issue : issue))
        )
        return
      }

      const res = await createIssue(data)
      setIssues([res.issue, ...issues])
      toast.success(`Issue ${formType}d successfully.`)
      navigate('/')
    } catch {
      toast.error('Something went wrong, please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter issue title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Describe the issue...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='priority'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Select priority' />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton
          size='lg'
          className='mt-4 w-full'
          text={formType === 'update' ? 'Update' : 'Create'}
          loading={isPending}
          variant='secondary'
          type='submit'
        />
      </form>
    </Form>
  )
}

export default IssueForm
