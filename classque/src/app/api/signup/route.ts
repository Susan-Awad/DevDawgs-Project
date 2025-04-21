import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/userSchema";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../config/mongodb";

// Handles user registration by parsing the request body, hashing the password,
export const POST = async (request: NextRequest) => {
  const { username, email, password } = await request.json();

    
// Connects to the MongoDB database
  await connectMongoDB();
  
  const hashedPassword = await bcrypt.hash(password, 5);
  
// Construct the new user object
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };

  try {
    await User.create(newUser);
  } catch (e: any) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
