import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  // Expire the cookie by setting a past date
  response.cookies.set('token', '', { path: '/', expires: new Date(0) });
  response.cookies.set('email', '', { path: '/', expires: new Date(0) });
  return response;
}