'use server'

import { signIn, signOut } from "../../auth";
import connnectMongoDB from "../../../config/mongodb";
import connectMongoDB from "../../../config/mongodb";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  
  const email = formData.get("email") as string; 
  const password = formData.get("password") as string; 

  try {

    await connectMongoDB();
    
    const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return response;
   } catch (err: any) {
      throw err;
   }
}