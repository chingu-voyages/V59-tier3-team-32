'use client'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='max-w-[80%] mx-auto'>
        <nav aria-label='Main navigation' className='flex justify-between items-center p-4'>
            <Link href="/" aria-label="Home - Logo" ><Image src="" alt="Logo" width={50} height={50} /></Link>
            <CurrentDate />
            <ul role='list' className='flex '>
                <li><Link href="/" className="">Home</Link></li>
                <li><Link href="/tests" className="">Questions</Link></li>
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
  return <div>{formattedDate}</div>
}

const AuthLinks = () => {
  return (
    <div className='flex gap-4'>
    <Link href="/login" className="">Login</Link>
    <Link href="/signup" className="">Sign Up</Link>
    </div>
  )
}

export default Header