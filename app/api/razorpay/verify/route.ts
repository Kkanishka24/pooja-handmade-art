import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_data, // { items, shipping_address, total, subtotal, shipping, user_id? }
    } = body;

    // 1. Verify signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Payment service not configured" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Save order to Supabase
    const supabase = createSupabaseAdminClient();
    const orderNumber = generateOrderNumber();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: order_data.user_id || null,
        status: "confirmed",
        subtotal: order_data.subtotal,
        shipping: order_data.shipping,
        discount: 0,
        total: order_data.total,
        shipping_address: order_data.shipping_address,
        payment_id: razorpay_payment_id,
        payment_method: "razorpay",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    // 3. Save order items
    const orderItems = order_data.items.map((item: {
      product: { id: string; name: string; images: string[]; price: number };
      quantity: number;
    }) => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.images?.[0] || null,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    }));

    await supabase.from("order_items").insert(orderItems);

    return NextResponse.json({ success: true, order_number: orderNumber, order_id: order.id });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
