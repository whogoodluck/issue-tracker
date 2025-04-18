import { NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import Logo from './issue-tracker-logo'

function Header() {
  const location = useLocation()

  return (
    <header className='bg-background fixed top-0 left-0 flex h-24 w-full items-center justify-between px-4 md:px-12'>
      <Logo />
      <div>
        <NavLink
          to={location.pathname === '/create' ? '/' : '/create'}
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          {location.pathname !== '/' ? 'Go Home' : 'Create Issue'}
        </NavLink>
      </div>
    </header>
  )
}

export default Header
