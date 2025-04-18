import { useNavigate } from 'react-router-dom'

import LoadingButton from '@/components/common/loading-button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className='flex h-screen flex-col items-center justify-center gap-4 py-12 lg:py-20'>
      <h2 className='text-center text-3xl font-semibold text-black'>
        Page Not Found
      </h2>
      <LoadingButton text='Go back' onClick={() => navigate(-1)} />
    </section>
  )
}
