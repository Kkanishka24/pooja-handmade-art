import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

// GET: List all categories with product counts
export async function GET() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, products ( id )")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }

  const categories = (data || []).map(
    ({ products, ...cat }: { products?: unknown[]; [key: string]: unknown }) => ({
      ...cat,
      product_count: Array.isArray(products) ? products.length : 0,
    })
  );

  return NextResponse.json({ categories });
}

// POST: Create a new category
export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("categories")
    .insert(body)
    .select()
    .single();

  if (error) {
    console.error("Category insert error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }

  return NextResponse.json({ category: data }, { status: 201 });
}

// PATCH: Update a category
export async function PATCH(request: Request) {
  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }

  return NextResponse.json({ category: data });
}

// DELETE: Delete a category (products keep their row, category_id set to NULL)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Category ID required" }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
