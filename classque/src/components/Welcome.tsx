'use client';
import Link from 'next/link';
import Image from 'next/image';
import splash from '../assets/splash.png';
import Item from './Item'
import {useState, useEffect} from 'react';
import initialData from '../app/data/initialData.json'

const Welcome = () => {

    // Load the json file and map it into tasks
    const initial = initialData.flat().map((item) => ({
        ...item,
        start: new Date(item.start),
        duration: item.duration as 1 | 2,
        imageUrl: "https://wallpapers.com/images/featured/ipad-default-th9c4d752f2dzzfs.jpg",
        tasks: item.tasks.map(task => ({
            ...task,
            dueDate: new Date(task.dueDate)
        }))
    }));

    return (<>
        <div className="relative h-screen w-full">
            {/* Splash Background*/}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={splash} 
                    alt="ClassCue background splash" 
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </div>
            {/*black to pink gradient layer*/}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-pink-400 opacity-20'></div>

            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                    Effortless Scheduling, <br className="hidden sm:block" /> {/*seperates the 2*/}
                    Maximum Productivity
                </h1>
                <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white max-w-2xl drop-shadow-md">
                    Our intuitive scheduling platform makes it easy to manage your work-life balance, 
                    all in just a few clicks. Being a student just got a whole lot easier!
                </p>
            </div>
        </div>

        {/*Explanation & Examples*/}
        <div className="bg-[#faece5] bg-opacity-80 p-8 rounded-lg shadow-md pt-15">
            <h1 className="text-5xl font-bold mb-4 text-center tracking-widest">What Do We Do?</h1>
            <p className="text-2xl mb-4 w-20px max-w-full mx-auto text-center">Do you have a busy week? Our application will optimize your work calendar. 
                When you create a schedule, our application will maximize your week by showing you how to best
                divide your time based on each tasks importance. All you have to do is insert all your tasks within one or two weeks,
                give their due dates and points, and we will do all the work!
            </p>
            <br/><br/>
            <p className="text-3xl font-bold mb-4 text-center tracking-wide">Example Schedules</p>
            <hr/><br/>
            <div className="flex justify-center w-full">
                <div className='w-full grid grid-col md:grid-cols-3 gap-6'>
                        {initial.map((item, k) => (  
                        <Item item={item} key={k} isExample={true} />
                    ))};
                </div>
            </div>
        </div>
        </>
    )};
export default Welcome;