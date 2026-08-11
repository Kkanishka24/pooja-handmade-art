import { NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/utils";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

// POST: Create a new COD order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping_address, payment_method, total, subtotal, shipping, user_id } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const orderNumber = generateOrderNumber();

    // Save order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user_id || null,
        status: payment_method === "cod" ? "confirmed" : "pending",
        subtotal: subtotal || total,
        shipping: shipping || 0,
        discount: 0,
        total,
        shipping_address,
        payment_method: payment_method || "cod",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Save order items
    const orderItems = items.map((item: {
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

    return NextResponse.json(
      { success: true, order_number: orderNumber, order_id: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// GET: Look up order by order_number + email
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order_number = searchParams.get("order_number");
  const email = searchParams.get("email");

  if (!order_number) {
    return NextResponse.json({ error: "Order number required" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  // Fetch order with items
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("order_number", order_number)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // If email provided, verify it matches shipping address email
  if (email && order.shipping_address?.email) {
    if (order.shipping_address.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
  }

  // Build timeline steps
  const statusOrder = ["pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered"];
  const currentStatusIndex = statusOrder.indexOf(order.status);

  const steps = [
    {
      id: "confirmed",
      label: "Order Confirmed",
      description: "Your order has been placed & confirmed",
      done: currentStatusIndex >= 1,
      date: new Date(order.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
    },
    {
      id: "processing",
      label: "Being Handcrafted",
      description: "Pooja is stitching your item with love",
      done: currentStatusIndex >= 2,
      date: currentStatusIndex >= 2 ? "In progress" : "Pending",
    },
    {
      id: "shipped",
      label: "Shipped",
      description: "Your package is on its way!",
      done: currentStatusIndex >= 3,
      date: currentStatusIndex >= 3 ? "Shipped" : "Pending",
    },
    {
      id: "out_for_delivery",
      label: "Out for Delivery",
      description: "Almost there — your package is nearby",
      done: currentStatusIndex >= 4,
      date: currentStatusIndex >= 4 ? "Out for delivery" : "Expected soon",
    },
    {
      id: "delivered",
      label: "Delivered",
      description: "Package delivered to your doorstep",
      done: currentStatusIndex >= 5,
      date: currentStatusIndex >= 5 ? "Delivered" : "Expected",
    },
  ];

  return NextResponse.json({
    order_number: order.order_number,
    status: order.status,
    total: order.total,
    shipping_address: order.shipping_address,
    payment_method: order.payment_method,
    items: order.order_items,
    placed_on: new Date(order.created_at).toLocaleDateString("en-IN", { dateStyle: "long" }),
    steps,
    created_at: order.created_at,
  });
}
