'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const Header = () => {
    const pathname = usePathname()

  return (
    <header className='w-full  bg-[#161c2f]'>
        <nav aria-label='Main navigation' className='flex justify-between items-center p-4 text-[20px] max-w-[85%] mx-auto'>
            <Link href="/" aria-label="Home - Logo" ><Image src="" alt="Logo" width={50} height={50} /></Link>
            <CurrentDate />
            <ul role='list' className='flex space-x-12 '>
                <li><Link href="/" className={`font-semibold hover:text-primary active:text-primary ${pathname === '/' ? 'text-primary' : ''}`}>Home</Link></li>
                <li><Link href="/tests" className={`font-semibold hover:text-primary active:text-primary ${pathname === '/tests' ? 'text-primary' : ''}`}>Tests</Link></li>
            </ul>

            <AuthLinks />
        </nav>
    </header>
  )
}

const CurrentDate = () => {
  const now: Date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate:string = now.toLocaleDateString('en-us', options);
  return <div className='font-semibold'>{formattedDate}</div>
}

const AuthLinks = () => {
  return (
    <div className='flex space-x-6 items-center'>
      <Link href="/login" className="hover:underline">Login</Link>
      <Link href="/signup" className="px-8 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent">Sign Up</Link>
    </div>
  )
}

export default Header