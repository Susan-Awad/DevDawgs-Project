// route for all schedules in a user object
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../auth';
import User from '../../../models/userSchema';
import mongoose from 'mongoose';
import connectMongoDB from '../../../../config/mongodb';

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Get the current user from the session
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse the request body
    const { scheduleName, startDate, duration, imageUrl, tasks } = await request.json();

    const durationWeeks = duration === '1 Week' ? 1 : 2;

    // Format tasks to match the schema
    const formattedTasks = tasks.map((task : any) => ({
      name: task.name,
      dueDate: new Date(task.dueDate),
      points: parseInt(task.points) || 0
    }));

    // Find the user and update schedules array
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $push: { 
        schedules: {
        title: scheduleName,
        start: startDate,
        duration: durationWeeks,
        tasks: formattedTasks,
        imageUrl: imageUrl} 
        } 
      },
      { new: true }
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
  };
}

export async function GET() {
  try {
    await connectMongoDB();

    // Get the current user from the session
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    };

    // Find the user and retrieve their schedules
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    };

    // Return the schedules as items
    return NextResponse.json({ items: user.schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({ error: 'Error fetching schedules' }, { status: 500 });
  };
}