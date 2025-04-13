import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../auth';
import User from '../../../models/userSchema';
import mongoose from 'mongoose';

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // If already connected, use current connection
    return;
  }
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Get the current user from the session
    const session = await auth();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Parse the request body
    const { scheduleName, duration, tasks } = await req.json();
    
    // Convert duration string to number (1 or 2 weeks)
    const durationInWeeks = duration === '1 Week' ? 1 : 2;
    
    // Format tasks to match your schema
    const formattedTasks = tasks.map(task => ({
      name: task.name,
      dueDate: new Date(task.dueDate),
      points: parseInt(task.points) || 0
    }));
    
    // Find the user and update their schedules array
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $push: { 
          schedules: {
            title: scheduleName,
            duration: durationInWeeks,
            tasks: formattedTasks
          } 
        } 
      },
      { new: true } // Return the updated document
    );
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Schedule created successfully',
      schedule: updatedUser.schedules[updatedUser.schedules.length - 1]
    });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return NextResponse.json({ error: 'Error creating schedule' }, { status: 500 });
  }
}