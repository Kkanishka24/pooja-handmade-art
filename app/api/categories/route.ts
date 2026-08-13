import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { mapDbCategory } from "@/lib/db";

// GET: Public categories with product counts
export async function GET() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*, products ( id )")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }

  const categories = (data || []).map((row: { [key: string]: unknown }) => {
    const { products, ...cat } = row as { products?: unknown[]; [key: string]: unknown };
    return mapDbCategory({
      id: String(cat.id),
      name: String(cat.name),
      slug: String(cat.slug),
      description: cat.description as string | null,
      image: cat.image as string | null,
      product_count: Array.isArray(products) ? products.length : 0,
    });
  });

  return NextResponse.json({ categories, total: categories.length });
}
