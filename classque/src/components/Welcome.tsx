'use client';
import Link from 'next/link';
import Image from 'next/image';
import splash from '../assets/classque_splash.png';

const Welcome = () => { 
    
    return (
        <div className="min-h-screen flex items-center justify-left">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800">Effortless Scheduling, Maximum Productivity</h1>
                <div className="mt-12">
                    <h2 className="text-2l font-bold text-gray-800">Our intuitive scheduling platform makes it easy to manage your work-life balance, all in just a few clicks. Being a student just got a whole lot easier!</h2>
                </div>
            </div>
            <Image className='w-auto' src={splash} alt='ClassCue logo'/>
        </div>
    )};
export default Welcome;