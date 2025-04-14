import Card from "./Card";
import Link from "next/link";
import { ITask } from "@/models/taskSchema";
import { Url } from "next/dist/shared/lib/router/router";

interface ItemProps {
  item: {
    title: string;
    start: Date;
    duration: 1 | 2; // 1 or 2 weeks
    tasks: ITask[];
    imageUrl: string;
  };
}

const Item = ({ item }: ItemProps) => {
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
              <p key={index} className="text-gray-600 mt-2">
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