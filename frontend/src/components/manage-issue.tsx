import { useState } from 'react'
import { deleteIssue } from '@/actions/issue'
import { useIssue } from '@/providers/issue-provider'
import { EditIcon, Ellipsis, Loader2Icon, Trash2 } from 'lucide-react'

import { Issue } from '@/types/issue'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import IssueForm from './issue-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'
import { buttonVariants } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

function ManageIssue({ issue }: { issue: Issue }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { issues, setIssues } = useIssue()

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true)
      const res = await deleteIssue(issue.id)
      setIssues(issues.filter(issue => issue.id !== res.issue.id))
    } catch (err) {
      console.log(err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='text-primary cursor-pointer outline-none'>
          <Ellipsis strokeWidth={3} className='' />
          <span className='sr-only'>Toggle task menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2'>
        <AlertDialog>
          <AlertDialogTrigger className='flex cursor-pointer items-center gap-2'>
            {isDeleting ? (
              <>
                <Loader2Icon
                  size={16}
                  className='text-destructive h-4 w-4 animate-spin'
                />{' '}
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} className='text-destructive' /> Delete
              </>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteTask}
                className={cn(buttonVariants({ variant: 'destructive' }))}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger className='flex cursor-pointer items-center gap-2'>
            <EditIcon size={16} /> Edit
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className='text-center'>Update Issue</DialogTitle>
            <DialogDescription>
              <IssueForm formType='update' issue={issue} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ManageIssue
