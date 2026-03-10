import { NextResponse } from "next/server";

type Role = "admin" | "customer";

const ADMIN_EMAIL = "pentoprinters@gmail.com";
const ADMIN_PASSWORD = "Patiala@0617";

function makeDisplayNameFromEmail(email: string) {
  const base = email.split("@")[0] ?? "Customer";
  const cleaned = base.replace(/[._-]+/g, " ").trim();
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ") || "Customer";
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  let role: Role = "customer";

  if (email === ADMIN_EMAIL) {
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
    }
    role = "admin";
  }

  const displayName = role === "admin" ? "Admin" : makeDisplayNameFromEmail(email);

  const response = NextResponse.json({ success: true, role });
  response.cookies.set("user_role", role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });
  response.cookies.set("user_email", email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });
  response.cookies.set("user_name", displayName, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });

  return response;
}