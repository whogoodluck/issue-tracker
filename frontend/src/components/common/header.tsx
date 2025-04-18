import Logo from './issue-tracker-logo'

function Header() {
  return (
    <header className='flex h-24 items-center justify-between px-4 md:px-12'>
      <Logo />
    </header>
  )
}

export default Header
