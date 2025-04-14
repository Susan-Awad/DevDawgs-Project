import mongoose, { Document, Schema, Model } from "mongoose";
import { ITask, taskSchema } from "./taskSchema";

// Define the Schedule interface
export interface ISchedule {
    title: string;
    start: Date;
    duration: 1 | 2; // 1 or 2 weeks
    tasks: ITask[];
  }
  
  // Define the Schedule schema
export const scheduleSchema = new Schema<ISchedule>({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    duration: { type: Number, required: true, enum: [1, 2] },
    tasks: [taskSchema]
  });

  const Schedule: Model<ISchedule> = mongoose.models.Schedule || mongoose.model<ISchedule>("Schedule", scheduleSchema);
  export default Schedule;