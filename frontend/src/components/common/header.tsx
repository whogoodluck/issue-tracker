import { NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import Logo from './issue-tracker-logo'

function Header() {
  const location = useLocation()

  return (
    <header className='bg-background flex h-24 w-full items-center justify-between px-4 md:px-12'>
      <Logo />
      <div>
        <NavLink
          to={location.pathname === '/create' ? '/' : '/create'}
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          {location.pathname !== '/create' ? 'Create Issue' : 'Go Home'}
        </NavLink>
      </div>
    </header>
  )
}

export default Header
