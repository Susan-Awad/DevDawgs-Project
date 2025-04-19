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
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800">Effortless Scheduling, Maximum Productivity</h1>
                <div className="mt-12">
                    <h2 className="text-2l font-bold text-gray-800">Our intuitive scheduling platform makes it easy to manage your work-life balance, all in just a few clicks. Being a student just got a whole lot easier!</h2>
                </div>
            </div>
            <div>
                <Image className='w-auto' src={splash} alt='ClassCue logo'/>
            </div>
        </div>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
            <p className="text-2xl font-bold mb-4 text-center">Example Schedules</p>
            <hr/><br/>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {initial.map((item, k) => (  
                    <Item item={item} key={k} isExample={true} />
                ))};
            </div>
        </div>
        </>
    )};
export default Welcome;