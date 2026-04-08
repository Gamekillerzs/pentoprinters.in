import { NextRequest, NextResponse } from "next/server";
import { createOrder, listOrders } from "@/lib/orderStore";

export async function GET() {
  return NextResponse.json({ orders: listOrders() });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const customerName = String(formData.get("customerName") ?? "").trim();
  const serviceName = String(formData.get("serviceName") ?? "").trim() || "General Printing";
  const printMode = String(formData.get("printMode") ?? "").trim() || "Color";
  const paperQuality = String(formData.get("paperQuality") ?? "").trim() || "Standard";
  const size = String(formData.get("size") ?? "").trim() || "A4";
  const quantityRaw = Number(formData.get("quantity") ?? 0);
  const quantity = Number.isFinite(quantityRaw) && quantityRaw > 0 ? Math.floor(quantityRaw) : 0;
  const file = formData.get("file");
  const customerEmail = request.cookies.get("user_email")?.value?.toLowerCase();

  if (!customerName || !(file instanceof File) || quantity <= 0) {
    return NextResponse.json(
      { error: "customerName, file, and valid quantity are required" },
      { status: 400 }
    );
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileContentBase64 = fileBuffer.toString("base64");

  const order = createOrder({
    customerName,
    customerEmail,
    documentName: file.name,
    fileContentBase64,
    fileMimeType: file.type || "application/octet-stream",
    serviceName,
    printMode,
    paperQuality,
    quantity,
    size,
    storedFileName: file.name
  });

  return NextResponse.json({ order }, { status: 201 });
}
