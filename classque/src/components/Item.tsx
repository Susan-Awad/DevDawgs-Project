import Card from "./Card";
import Link from "next/link";
import { ITask } from "@/models/taskSchema";
import { useRouter, useParams } from 'next/navigation';
import EditIcon from '../assets/edit2.png'

interface ItemProps {
  item: {
    _id: any;
    title: string;
    start: Date;
    duration: 1 | 2; // 1 or 2 weeks
    tasks: ITask[];
    imageUrl: string;
  };
}

const Item = ({ item }: ItemProps) => {
  const router = useRouter();

  // Deletes schedule based on id
  const handleDelete = async () => {
    try {
      const response = await fetch(`../api/schedules/${item._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item.');
      };

      router.push('/show-items');
      router.refresh(); // Refrreshs page after deletion
    } catch (error) {
      console.log('Failed to delete item,', error);
    }
  };

  return (
    <Card>
      <div className="w-full h-68 relative rounded overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt="Schedule preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
          <p className="text-gray-600">
            Start: {new Date().toLocaleDateString()} | Duration: {item.duration} week{item.duration == 2 ? 's' : ''} | Tasks: {item.tasks?.length || 0}
          </p>
        </div>
        <div>
        <Link href={`/update-item/${item._id}`}
          className="text-white px-2 py-0.5 rounded hover:bg-[#D3D3D3] mt-4 inline-block">
          <img className="w-5" src={EditIcon.src} alt="edit"/>
        </Link>
        <button 
          type="button" 
          onClick={() => handleDelete()}
          className="text-gray-600 hover:text-red-500 p-2"
        >
          {/* Code for the trash can logo*/}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
          </svg>
        </button>
        </div>
      </div>
      <div className="max-h-30 overflow-y-scroll">
        <div className="mt-2">
          {item.tasks
            .slice() // create a shallow copy so you don't mutate the original array
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) // sort by dueDate
            .map((task, index) => (<>
              <p key={index} className="text-lg font-semibold mt-2">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-600 mt-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{task.name}
              </p>
              </>
            ))}
          </div>      
        </div>
    </Card>
  );
}

export default Item;