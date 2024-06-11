// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const token = cookies.get('__Secure-authjs.session-token'); // Assume auth token is stored in cookies
  
  const url = req.nextUrl.clone();

  if (!token) {
    // User is not authenticated, redirect to signup page
    url.pathname = '/signup';
    return NextResponse.redirect(url);
  }

  // User is authenticated, continue with the request
  return NextResponse.next();
}

// Specify the paths where middleware should run
export const config = {
  matcher: ['/','/teacher','/teacher/create','/teacher/courses',], // Apply middleware to the home page
};
