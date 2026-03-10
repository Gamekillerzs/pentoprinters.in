import { NextRequest, NextResponse } from "next/server";
import { listOrdersByCustomerEmail } from "@/lib/orderStore";

export async function GET(request: NextRequest) {
  const role = request.cookies.get("user_role")?.value;
  const email = request.cookies.get("user_email")?.value;

  if (role !== "customer" || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ orders: listOrdersByCustomerEmail(email) });
}