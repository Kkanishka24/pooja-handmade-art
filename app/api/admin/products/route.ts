import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

// GET: List all products from Supabase
export async function GET() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select(`*, categories ( name, slug )`)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }

  return NextResponse.json({ products: data || [] });
}

// POST: Create a new product
export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("products")
    .insert(body)
    .select()
    .single();

  if (error) {
    console.error("Product insert error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }

  return NextResponse.json({ product: data }, { status: 201 });
}

// PATCH: Update a product
export async function PATCH(request: Request) {
  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

// DELETE: Delete a product
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
