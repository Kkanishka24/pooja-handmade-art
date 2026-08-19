import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { mapDbCategory, mapDbProduct } from "@/lib/db";
import { categories as staticCategories } from "@/lib/data";
import { isCategoryMatch } from "@/lib/utils";
import { Product } from "@/types";

// GET: Public categories with product counts
export async function GET() {
  const supabase = createSupabaseAdminClient();

  const [catRes, prodRes] = await Promise.all([
    supabase.from("categories").select("*").order("created_at", { ascending: true }),
    supabase.from("products").select("*, categories ( id, name, slug, description, image )"),
  ]);

  let dbProducts: Product[] = [];
  if (!prodRes.error && prodRes.data) {
    dbProducts = prodRes.data.map(mapDbProduct);
  }

  let rawCats = !catRes.error && catRes.data && catRes.data.length > 0 ? catRes.data : staticCategories;

  const categories = rawCats.map((cat: Record<string, unknown>) => {
    const cSlug = String(cat.slug);
    const count = dbProducts.filter((p) => isCategoryMatch(p.category, cSlug, p.customizable)).length;
    return mapDbCategory({
      id: String(cat.id),
      name: String(cat.name),
      slug: cSlug,
      description: (cat.description as string | null) || "",
      image: (cat.image as string | null) || "",
      product_count: count,
    });
  });

  return NextResponse.json({ categories, total: categories.length });
}

