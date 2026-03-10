import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
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

  const uploadsDir = path.join(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const extension = path.extname(file.name);
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
  const fullPath = path.join(uploadsDir, uniqueName);

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await writeFile(fullPath, fileBuffer);

  const order = createOrder({
    customerName,
    customerEmail,
    documentName: file.name,
    serviceName,
    printMode,
    paperQuality,
    quantity,
    size,
    storedFileName: uniqueName
  });

  return NextResponse.json({ order }, { status: 201 });
}