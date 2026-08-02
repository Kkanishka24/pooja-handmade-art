import { NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping_address, payment_method, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // In production: save to Supabase, send email, trigger Razorpay
    const order = {
      id: crypto.randomUUID(),
      order_number: generateOrderNumber(),
      items,
      shipping_address,
      payment_method,
      total,
      status: "confirmed",
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order_number = searchParams.get("order_number");

  if (!order_number) {
    return NextResponse.json({ error: "Order number required" }, { status: 400 });
  }

  // Demo: return mock tracking data
  return NextResponse.json({
    order_number,
    status: "shipped",
    tracking_number: "DTDC123456789IN",
    carrier: "DTDC Express",
    estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    steps: [
      { label: "Order Confirmed", done: true, date: new Date().toISOString() },
      { label: "Being Handcrafted", done: true, date: new Date().toISOString() },
      { label: "Shipped", done: true, date: new Date().toISOString() },
      { label: "Out for Delivery", done: false },
      { label: "Delivered", done: false },
    ],
  });
}
