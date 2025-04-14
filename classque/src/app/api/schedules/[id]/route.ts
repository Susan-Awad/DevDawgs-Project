import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../../models/userSchema';
import mongoose from 'mongoose';

interface RouteParams {
    params: {id: string};
};

export async function GET(request:NextRequest, { params }: RouteParams) {
    try {
        await connectMongoDB();
        const session = await auth();
        const {id} = await params;

        // Check authentication
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        };

        const user = await User.findOne(
            { 
              email: session.user.email,
              "schedules._id": new mongoose.Types.ObjectId(id)
            },
            {
              "schedules.$": 1
            }
        );
      
        // Check if user exists in database
        if (!user) {
            return NextResponse.json({ error: 'User or schedule not found' }, { status: 404 });
        };
          
        // Check if schedule exists in database
        if (!user.schedules || user.schedules.length === 0) {
            return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
        };
          
        return NextResponse.json({ item: user.schedules[0] }, { status: 200 });
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return NextResponse.json({ error: 'Error fetching schedule' }, { status: 500 });
    };
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();
        const session = await auth();
        const {id} = await params;

        // Check authentication
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        };

        const updatedData = await request.json();
    
        // Convert the string ID to ObjectId
        const scheduleId = new mongoose.Types.ObjectId(id);
        const result = await User.findOneAndUpdate(
            { 
                email: session.user.email,
                "schedules._id": scheduleId
            },
            { $set: {
                "schedules.$.title": updatedData.scheduleName,
                "schedules.$.start": updatedData.start,
                "schedules.$.duration": updatedData.duration,
                "schedules.$.tasks": updatedData.tasks,
                "schedules.$.imageUrl": updatedData.imageUrl
                } 
            },
            { new: true }
        );

        // Check if schedule exists in database
        if (!result) {
            return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
        };

        return NextResponse.json({ 
            message: 'Schedule updated successfully', 
            schedule: result.schedules[0] 
        });
    } catch (error) {
        console.error('Error updating schedule:', error);
        return NextResponse.json({ error: 'Error updating schedule' }, { status: 500 });
    }
}

export async function DELETE(request:NextRequest, { params }: RouteParams) {
    try {
        await connectMongoDB();
        const session = await auth();
        const {id} = await params;
  
        // Check authentication
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        };
  
        const scheduleId = new mongoose.Types.ObjectId(id);
        const result = await User.findOneAndUpdate(
            { email: session.user.email },
            { $pull: { schedules: { _id: scheduleId } } },
            { new: true }
        );
        
        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        };

        return NextResponse.json({ message: "Schedule deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE /api/schedule/[id] error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    };
  }