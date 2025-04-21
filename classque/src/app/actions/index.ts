'use server'

import { signIn, signOut } from "../../auth";
import connnectMongoDB from "../../../config/mongodb";
import connectMongoDB from "../../../config/mongodb";


// Logs the user out and redirects them to the homepage
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
//  Handles the login with user-provided credentials and returns the sign-in response
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