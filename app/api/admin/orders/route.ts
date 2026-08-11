import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

// GET all orders (admin only — secured by service role)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const limit = parseInt(searchParams.get("limit") || "50");

  const supabase = createSupabaseAdminClient();

  let query = supabase
    .from("orders")
    .select(`
      id,
      order_number,
      status,
      total,
      payment_method,
      shipping_address,
      created_at,
      order_items ( product_name, quantity )
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  // Apply search filter client-side (Supabase jsonb search on shipping_address)
  const orders = search
    ? (data || []).filter((o: { shipping_address?: { full_name?: string }; order_number?: string }) => {
        const name = o.shipping_address?.full_name?.toLowerCase() || "";
        const num = o.order_number?.toLowerCase() || "";
        return name.includes(search.toLowerCase()) || num.includes(search.toLowerCase());
      })
    : data || [];

  return NextResponse.json({ orders });
}

// PATCH: update order status
export async function PATCH(request: Request) {
  const { order_id, status } = await request.json();
  if (!order_id || !status) {
    return NextResponse.json({ error: "order_id and status required" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", order_id);

  if (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
