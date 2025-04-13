import mongoose, { Document, Schema, Model } from "mongoose";
import { ISchedule, scheduleSchema } from "./scheduleSchema";

// Define the User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  schedules: ISchedule[];
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  schedules: [scheduleSchema],
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;