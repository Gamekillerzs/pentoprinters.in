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
  if (!order || !order.fileContentBase64) {
    return NextResponse.json({ error: "File not found for this order" }, { status: 404 });
  }

  try {
    const fileBuffer = Buffer.from(order.fileContentBase64, "base64");
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": order.fileMimeType || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(order.documentName)}"`
      }
    });
  } catch {
    return NextResponse.json({ error: "File could not be prepared for download" }, { status: 500 });
  }
}
