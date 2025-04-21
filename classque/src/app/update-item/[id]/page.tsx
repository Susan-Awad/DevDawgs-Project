//this is the page displayed when the pencil is clicked to update item
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import Link from 'next/link';
import {ITask} from '../../../models/taskSchema';
import axios from 'axios';

interface ITaskWithId extends ITask {
  id: string;
}

// image api used for the schedule image
const API_URL = 'https://api.unsplash.com/photos/random';
const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
// Function to generate a unique ID
// substring(1,9) is used to generate a 8char id and .toString(36) includes 0-9 and a-z
const generateId = () => Math.random().toString(36).substring(1, 9);

export default function UpdateItem() {
    const [scheduleName, setScheduleName] = useState('');
    const [start, setStart] = useState(new Date());
    const [duration, setDuration] = useState('1 Week');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [tasks, setTasks] = useState<ITaskWithId[]>([]);
    const [originalImageUrl, setOriginalImageUrl] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

  // retrieves current schedule
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/schedules/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const task = data.item; 

        setScheduleName(task.title || '');
        setStart(task.start);
        if (task.duration === 1) {
          setDuration('1 Week');
        } else setDuration('2 Weeks');
        setOriginalImageUrl(task.image || '');
        setImage(task.image || '');
        setImageUrl(task.imageUrl || '');
        
        const taskId = task.tasks.map((task:any) => ({
          id: task._id || generateId(),
          _id: task._id,
          name: task.name,
          dueDate: new Date(task.dueDate),
          points: task.points,
        }));

        setTasks(taskId);
        } catch (error) {
          console.error('Error from UpdateItemInfo:', error);
        }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleScheduleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleName(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const handleTaskChange = (id: string, field: keyof ITask, value: any) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  const removeTask = (id: string) => {
    // Only remove the task if there's more than one
    if (tasks.length > 1) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } else {
      // If it's the last task, just clear its values instead of removing it
      const today = new Date();
      setTasks([{ id: generateId(), name: '', dueDate: today, points: 50 }]);
    }
  };

  const addNewTask = () => {
      const today = new Date();
      setTasks([...tasks, { 
        id: generateId(), 
        name: '', 
        dueDate: today, 
        points: 50
      }]);
  };

  // format date as YYYY-MM-DD. Had to be added because it would throw an error after form submission.
  const formatDateForInput = (date: Date): string => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
      }
      return date.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out any tasks with empty names before submitting
    const validTasks = tasks.filter(task => task.name.trim() !== '');
    
    // Only proceed if there's at least one valid task. The length could've been 0 before because it filters empty tasks.
    if (validTasks.length === 0) {
      alert('Please add at least one task with a name');
      return;
    }

    try {

      // only update image if it's a different keyword
      let fetchedImage = imageUrl;
      if (image !== originalImageUrl && image.trim() !== '') {
        const result = await axios.get(
          `${API_URL}?query=${encodeURIComponent(image)}&count=1&client_id=${apiKey}`
        );
        fetchedImage = result.data[0]?.urls?.regular;
      }

      // Transform tasks to match ITask interface (remove the id field)
      const tasksToSubmit = validTasks.map(({ id, ...rest }) => rest);

      const formData = {
        scheduleName,
        start,
        duration,
        image,
        tasks: tasksToSubmit,
        imageUrl: fetchedImage,
      };
      
      const response = await fetch(`../api/schedules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      router.push(`/show-items`);
    } catch (error) {
      console.log('Error in UpdateItemInfo!', error);
    }
  };

  return (
    <div className='bg-[#F7D0BC]'>
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card>
        <div className="text-3xl font-bold mb-4 text-center">ClassCue</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xl text-center mb-2">INSTRUCTIONS: please give each of your tasks a priority 
            score of 1-100 (1 is lowest 100 is highest)</p>
          <br/><hr/>
          <div className="text-center mb-4 p-2">
            <label className='text-2xl'>Schedule Name</label>
            <input
              name="scheduleName"
              type="text"
              value={scheduleName}
              onChange={handleScheduleNameChange}
              placeholder="name"
              required
              className="w-full p-2 border-1 border-[#6A3636] rounded text-center text-lg"
            />
          </div>
          
          <div className="mb-4">            
            <div className="mb-4">
              <div className="flex justify-center gap-5">
                <p className="text-2xl mb-2 pt-2">Duration:</p>
                <label className={`px-4 py-2 rounded-md pt-2.5 ${duration === '1 Week' ? 'bg-gray-300' : 'bg-gray-100'}`}>
                  <input
                    type="radio"
                    name="duration"
                    value="1 Week"
                    checked={duration === '1 Week'}
                    onChange={handleDurationChange}
                    className="mr-2"
                  />
                  1 Week
                </label>
                <label className={`px-4 py-2 rounded-md pt-2.5 ${duration === '2 Weeks' ? 'bg-gray-300' : 'bg-gray-100'}`}>
                  <input
                    type="radio"
                    name="duration"
                    value="2 Weeks"
                    checked={duration === '2 Weeks'}
                    onChange={handleDurationChange}
                    className="mr-2"
                    required
                  />
                  2 Weeks
                </label>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-2xl mb-2 pt-2">Image</p>
            <input 
              name="image"
              type="text"
              value={image}
              onChange={handleImageChange}
              placeholder="image keyword: leave empty to keep same image"
              className="w-full p-2 border-1 border-[#6A3636] rounded text-center text-lg"
            />
          </div>

          <p className="text-2xl mb-2 pt-2 text-center">Tasks</p>
          {tasks.map((task) => (
            <div key={task.id} className="border-2 border-[#6A3636] p-4 rounded-md relative mb-4">
              <button 
                type="button" 
                onClick={() => removeTask(task.id)}
                className="absolute right-2 top-2 text-gray-500 hover:text-red-500">
                {/* Code for the trash can logo*/}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
              </button>
              
              <div className="mb-2">
                <p className="font-semibold text-2xl">Task</p>
              </div>
              
              <div className="mb-2">
                <label className="block text-lg mb-1">Name:</label>
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => handleTaskChange(task.id, 'name', e.target.value)}
                  className="w-full p-2 border-1 border-[#6A3636] rounded"
                  placeholder="Name"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-lg mb-1">Due Date:</label>
                <input
                  type="date"
                  value={formatDateForInput(task.dueDate)}
                  onChange={(e) => handleTaskChange(task.id, 'dueDate', new Date(e.target.value))}
                  className="w-full p-2 border-1 border-[#6A3636] rounded"
                />
              </div>
              
              <div>
                <label className="block text-lg mb-1">Priority:</label>
                <input
                  type="number"
                  value={task.points || 50}
                  onChange={(e) => handleTaskChange(task.id, 'points', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-1 border-[#6A3636] rounded"
                  placeholder="Priority"
                  min="1"
                  max="100"
                />
              </div>
            </div>
          ))}
          
          <div>
            <button
              type="button"
              onClick={addNewTask}
              className="text-lg flex items-center justify-center w-full py-2 border-1 border-[#6A3636] rounded hover:bg-[#c1b0a7]">
              New Task
            </button>
          </div>
        
          <div className="flex items-center justify-between mb-4">
          <Link href={`/show-items`}
              className="bg-[#6A3636] text-white px-6 py-2 rounded hover:bg-[#5A3636]">
              Go Back
          </Link>
            <button
              type="submit"
              className="bg-[#6A3636] text-white px-6 py-2 rounded hover:bg-[#5A3636]">
              Update
            </button>
          </div>
        </form>
      </Card>
    </div>
    </div>
  );
}