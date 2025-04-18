'use client'
import Item from "./Item";
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { ITask } from "@/models/taskSchema";

interface Schedule {
    _id: string; // lets the delete handler see an id
    title: string;
    start: Date;
    duration: 1 | 2; // 1 or 2 weeks
    imageUrl: string;
    tasks: ITask[];
}

export default function Items() {

    // Collects the schedule to display
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    useEffect(() => {
        const fetchSchedules = async () => {
        try {
          const response = await fetch('/api/schedules');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
           setSchedules(data.items);
        
           console.log(schedules);
        } catch (error) {
              console.log('Error from ShowItemList:', error);
        }
    };
    fetchSchedules();
    
    }, []);

    // delete schedule handler
    const handleDelete = (deletedScheduleId) => {
        setSchedules(prevSchedules =>
            prevSchedules.filter(schedule => schedule._id !== deletedScheduleId)
        );
    };

    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {schedules.length === 0 ? (<>
                    <p>No schedules created yet. Let's get to work!</p>
                    </>
                ) : (<>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-lg font-semibold mt-2">Your Schedules</h1>
                        <Link href={`/create-item`}
                            className="bg-[#6A3636] text-white px-4 py-2 rounded hover:bg-[#5A3636] mt-4 inline-block">
                                Create
                        </Link>
                    </div>
                    <hr/><br></br>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {schedules.map((item, k) => (  
                        <Item item={item} key={k} onDelete={handleDelete} isExample={false}/>
                    ))}
                        
                    </div>
                    </>
                )}
            
                <Link href={`/create-item`}
                   className="bg-[#6A3636] text-white px-4 py-2 rounded hover:bg-[#5A3636] mt-4 inline-block">
                    Create New Schedule
                </Link>
            </div>
        </section>
    );
    
};
