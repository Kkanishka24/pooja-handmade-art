import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const supabase = createSupabaseAdminClient();

  // Get all auth users — we join with profiles and aggregate orders
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, phone, created_at")
    .order("created_at", { ascending: false });

  if (profilesError) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }

  // Get all orders to aggregate by user_id
  const { data: orders } = await supabase
    .from("orders")
    .select("user_id, total, status");

  // Get auth emails via admin API (Supabase admin SDK)
  const { createClient } = await import("@supabase/supabase-js");
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: { users: authUsers } } = await adminClient.auth.admin.listUsers({
    perPage: 1000,
  });

  // Build email map
  const emailMap: Record<string, string> = {};
  for (const u of authUsers || []) {
    emailMap[u.id] = u.email || "";
  }

  // Aggregate order stats per user
  const orderStats: Record<string, { count: number; total: number }> = {};
  for (const order of orders || []) {
    if (!order.user_id) continue;
    if (!orderStats[order.user_id]) {
      orderStats[order.user_id] = { count: 0, total: 0 };
    }
    if (order.status !== "cancelled") {
      orderStats[order.user_id].count++;
      orderStats[order.user_id].total += order.total || 0;
    }
  }

  let customers = (profiles || []).map((p: { id: string; full_name: string | null; phone: string | null; created_at: string }) => ({
    id: p.id,
    full_name: p.full_name,
    email: emailMap[p.id] || "",
    phone: p.phone,
    order_count: orderStats[p.id]?.count || 0,
    total_spent: orderStats[p.id]?.total || 0,
    joined: p.created_at,
  }));

  // Apply search filter
  if (search) {
    const q = search.toLowerCase();
    customers = customers.filter(
      (c: { full_name: string | null; email: string }) =>
        (c.full_name || "").toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ customers });
}
