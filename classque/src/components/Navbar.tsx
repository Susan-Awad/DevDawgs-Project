'use client';
// This is from my Nextjs resources, Navbar_basic
import Image from 'next/image';
import logo from '../assets/classque_logo.jpg';
import {useState} from 'react';
import Link from 'next/link';
// import profileDefault from '@/assets/images/profile.png';

const Navbar = () => {


  const [isLoggedIn,setIsLoggedIn ] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(prev => !prev);

  }

  return (
    <nav className='bg-[#6A3636]'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            {/* <!-- Logo --> */}
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image className='h-15 w-auto' src={logo} alt='classque logo' />

              <span className='md:block text-white text-2xl font-bold ml-2'>
                ClassCue
              </span>
            </Link>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
         { 
          !isLoggedIn && (
                <div className='md:block md:ml-6'>
                  <div className='flex items-center'>
                    <Link rel="stylesheet" href="/show-items">
                    <button onClick = {handleLogin} className='flex items-center text-white bg-gray-400 hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'>
                      <span>Login | Register</span>
                    </button>
                    </Link>
                  </div>
                </div>
          )
        }

             {/* <!-- Right Side Menu (Logged In) --> */}
        { isLoggedIn && (
                <div className='md:block md:ml-6'>
                  <div className='flex items-center'>
                  <Link rel="stylesheet" href="/">
                    <span className='md:block text-white text-2l font-bold ml-2'>
                      Welcome, User
                    </span>
                    <button onClick = {handleLogin} className='flex items-center text-white bg-gray-400 hover:bg-gray-500 hover:text-white rounded-md px-3 py-2'>
                      <span>Logout</span>
                    </button>
                  </Link>
                  </div>
                </div>
        )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;