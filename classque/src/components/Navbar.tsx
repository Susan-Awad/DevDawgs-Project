'use client';
// This is from my Nextjs resources, Navbar_basic
import Image from 'next/image';
import logo from '../assets/classque_logo.jpg';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { Session } from "next-auth";
import { doLogout } from "../app/actions/index";

interface SSession {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}
interface NavbarProps {
  session: SSession | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);
 
  useEffect(() => {
    setIsLoggedIn(!!session?.user);
  }, [session]);

  const handleLogout = () => {
    doLogout();
    setIsLoggedIn(!!session?.user);
  };

  return (
    <nav className='bg-[#6A3636]'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>

          {/* Left side - Logo and nav links */}
          <div className='flex flex-1 items-center justify-start'>
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image className='h-10 w-auto' src={logo} alt='ClassCue logo' />
              <span className='md:block text-white text-3xl font-bold ml-2'>ClassCue |</span>
            </Link>
            {isLoggedIn && session?.user ? (
              <>
                <Link className='flex flex-shrink-0 items-center' href='/show-items' >
                  <span className='md:block text-white text-xl font-bold ml-2'>Schedules</span>
                </Link>
              </>
            ) : (<></>)}
          </div>

          {/* Right side - Auth status */}
          <div className='md:block md:ml-6'>
            <div className='flex items-center justify-end text-white space-x-4 text-xl'>
              {isLoggedIn && session?.user ? (
                <>
                  <span>Welcome, {session.user?.name || session.user?.email}</span>
                  <button
                    onClick={ handleLogout }
                    className='bg-[#faece5] hover:bg-[#c1b0a7] rounded-md px-3 py-2 text-black text-lg'>
                    Logout
                  </button> 
                </>
              ) : (
                <span className='bg-[#faece5] hover:bg-[#c1b0a7] rounded-md px-3 py-2 text-black'>
                  <Link href='/login' className='mr-1'>Login</Link> | <Link href='/signup' className='ml-1'>Register</Link>
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;