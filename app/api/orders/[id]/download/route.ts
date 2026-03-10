import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { findOrderById } from "@/lib/orderStore";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const role = request.cookies.get("user_role")?.value;
  if (role !== "admin") {
    return NextResponse.json({ error: "Only admin can download files" }, { status: 403 });
  }

  const order = findOrderById(params.id);
  if (!order || !order.storedFileName) {
    return NextResponse.json({ error: "File not found for this order" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "uploads", order.storedFileName);

  try {
    const fileBuffer = await readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(order.documentName)}"`
      }
    });
  } catch {
    return NextResponse.json({ error: "File not found on server" }, { status: 404 });
  }
}