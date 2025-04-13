import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Task interface
interface ITask {
  name: string;
  dueDate: Date;
  points: number; // For priority
}

// Define the Task schema
const taskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  points: { type: Number, required: true, default: 0 }
});

// Define the Schedule interface
interface ISchedule {
  title: string;
  duration: 1 | 2; // 1 or 2 weeks
  tasks: ITask[];
}

// Define the Schedule schema
const scheduleSchema = new Schema<ISchedule>({
  title: { type: String, required: true },
  duration: { type: Number, required: true, enum: [1, 2] },
  tasks: [taskSchema]
});

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  schedules: ISchedule[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  schedules: [scheduleSchema],
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;