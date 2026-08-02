import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === "rzp_test_placeholder") {
      // Return mock order for demo/development
      return NextResponse.json({
        id: "order_demo_" + Date.now(),
        amount: amount * 100,
        currency,
        receipt: receipt || "receipt_" + Date.now(),
        status: "created",
        demo: true,
      });
    }

    // Production: create real Razorpay order
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency,
      receipt: receipt || "receipt_" + Date.now(),
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}
