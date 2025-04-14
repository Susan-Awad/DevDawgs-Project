'use client'
import Item from "./Item";
import Link from 'next/link';
import {useState, useEffect} from 'react';

   export default function Items() {

    const [schedules, setSchedules] = useState([]);
  
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

    return (
    
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>

 
                {schedules.length === 0 ? (
                    <p>No schedules created yet. Let's get to work!</p>
                ) : (<>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-lg font-semibold mt-2">Your Schedules</h1>
                        <Link href={`/create-item`}
                            className="bg-[#6A3636] text-white px-4 py-2 rounded hover:bg-[#5A3636] mt-4 inline-block">
                                Create
                        </Link>
                    </div>
                    <hr/><br></br>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {schedules.map((item, k) => (  
                        <Item item={item} key={k}  />
                    ))}
                        
                    </div>
                    </>
                )}
            
            <Link href={`/create-item`}
                   className="bg-[#6A3636] text-white px-4 py-2 rounded hover:bg-[#5A3636] mt-4 inline-block"
                   
                > Create New Schedule
                </Link>
            </div>
        </section>

    );
    
};
