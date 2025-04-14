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
      <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
      <p className="text-gray-600">
        Start: {new Date(item.start).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        Duration: {item.duration} week{item.duration == 2 ? 's' : ''}
      </p>
      <p className="text-gray-600">
        Tasks: {item.tasks?.length || 0}
      </p>
    </Card>
  );
}

export default Item;