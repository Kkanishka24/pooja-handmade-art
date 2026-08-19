import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createSupabaseAdminClient();

  const [ordersRes, productsRes, customersRes, recentOrdersRes] = await Promise.all([
    supabase
      .from("orders")
      .select("id, total, status, created_at, shipping_address, order_items(product_name)")
      .order("created_at", { ascending: false }),
    supabase.from("products").select("id, name, price, rating, review_count, is_bestseller, images"),
    supabase.from("profiles").select("id"),
    supabase
      .from("orders")
      .select("id, order_number, status, total, shipping_address, created_at, order_items(product_name, quantity)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const orders = ordersRes.data || [];
  const products = productsRes.data || [];
  const customers = customersRes.data || [];
  const recentOrders = recentOrdersRes.data || [];

  const revenue = (orders as { status: string; total: number }[])
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  return NextResponse.json({
    stats: {
      revenue,
      orderCount: orders.length,
      customerCount: customers.length,
      productCount: products.length,
    },
    recentOrders,
    topProducts: (products as { is_bestseller: boolean }[])
      .filter((p) => p.is_bestseller)
      .slice(0, 5),
  });
}
