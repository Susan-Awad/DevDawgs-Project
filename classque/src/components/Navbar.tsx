'use client';
// This is from my Nextjs resources, Navbar_basic
import Image from 'next/image';
import logo from '../assets/classque_logo.jpg';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { Session } from "next-auth";
import { doLogout } from "../app/actions/index";

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}
interface NavbarProps {
  session: Session | null;
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
              <span className='md:block text-white text-2xl font-bold ml-2'>ClassCue</span>
            </Link>
            {isLoggedIn && session?.user ? (
              <>
                <Link className='flex flex-shrink-0 items-center' href='/show-items' >
                  <span className='md:block text-white text-2l font-bold ml-2'>| Schedules</span>
                </Link>
              </>
            ) : (<></>)}
          </div>

          {/* Right side - Auth status */}
          <div className='md:block md:ml-6'>
            <div className='flex items-center justify-end text-white space-x-4'>
              {isLoggedIn && session?.user ? (
                <>
                  <span>Welcome, {session.user?.name || session.user?.email}</span>
                  <button
                    onClick={ handleLogout }
                    className='bg-gray-400 hover:bg-gray-500 rounded-md px-3 py-2'
                  >
                    Logout
                  </button> 
                </>
              ) : (
                <span className='bg-gray-400 hover:bg-gray-500 rounded-md px-3 py-2'>
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