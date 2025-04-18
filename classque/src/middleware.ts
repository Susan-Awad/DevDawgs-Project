import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

// used to restrict pathways that the user can access based on authorization.
// specifically, the unauthorized user can only access the home page and login/register.
const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname); 

    const publicPaths = ["/"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
 
};

export const config = {
  matcher: [
    "/show-items",
    "/create-item/:path*",
    "/update-item/:path*",
  ],
};

export default middleware;
