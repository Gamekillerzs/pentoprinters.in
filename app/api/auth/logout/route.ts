import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set("user_role", "", { path: "/", maxAge: 0 });
  response.cookies.set("user_email", "", { path: "/", maxAge: 0 });
  response.cookies.set("user_name", "", { path: "/", maxAge: 0 });
  return response;
}