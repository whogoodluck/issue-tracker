import IssueForm from '@/components/issue-form'

function CreateIssuePage() {
  return (
    <section className=''>
      <div className='mx-auto flex max-w-xl flex-col justify-center rounded-xl px-4'>
        <h1 className='text-center text-3xl font-semibold'>Create Issue</h1>
        <IssueForm />
      </div>
    </section>
  )
}

export default CreateIssuePage
