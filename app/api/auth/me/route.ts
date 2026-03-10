import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const role = request.cookies.get("user_role")?.value;
  const name = request.cookies.get("user_name")?.value;
  const email = request.cookies.get("user_email")?.value;

  if (!role) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      role,
      name: name ?? "User",
      email: email ?? ""
    }
  });
}