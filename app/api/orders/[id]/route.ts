import { NextRequest, NextResponse } from "next/server";
import { findOrderById, type OrderStatus, updateOrderStatus } from "@/lib/orderStore";

const allowed: OrderStatus[] = ["pending", "accepted", "declined", "under-printing", "printed"];

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = findOrderById(params.id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const role = request.cookies.get("user_role")?.value;
  if (role !== "admin") {
    return NextResponse.json({ error: "Only admin can update order status" }, { status: 403 });
  }

  const body = (await request.json()) as { status?: OrderStatus };

  if (!body.status || !allowed.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = updateOrderStatus(params.id, body.status);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}