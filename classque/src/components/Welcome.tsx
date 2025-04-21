'use client';
import Link from 'next/link';
import Image from 'next/image';
import splash from '../assets/classque_splash.png';
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
        <div className="min-h-screen flex items-center justify-left">
            <div className="bg-[#faece5] bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-5xl font-bold text-gray-800">Effortless Scheduling, Maximum Productivity</h1>
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-gray-800 faece5">Our intuitive scheduling platform makes it easy to manage your work-life balance, 
                        all in just a few clicks. Being a student just got a whole lot easier!</h2>
                </div>
            </div>
            <div>
                <Image className='w-300%' src={splash} alt='ClassCue logo'/>
            </div>
        </div>
        <div className="bg-[#faece5] bg-opacity-80 p-8 rounded-lg shadow-md pt-15">
            <h1 className="text-5xl font-bold mb-4 text-center tracking-widest">What Do We Do?</h1>
            <p className="text-2xl mb-4 w-20px max-w-full mx-auto text-center">Do you have a busy week? Our application will optimize your work calandar. 
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