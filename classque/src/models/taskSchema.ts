import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Task interface
export interface ITask {
    name: string;
    dueDate: Date;
    points: number; // For priority
  }
  
  // Define the Task schema
export const taskSchema = new Schema<ITask>({
    name: { type: String, required: true },
    dueDate: { type: Date, required: true },
    points: { type: Number, required: true, default: 0 }
});

  const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);
  export default Task;