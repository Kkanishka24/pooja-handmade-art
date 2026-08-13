import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { mapDbProduct } from "@/lib/db";
import { Product } from "@/types";
import { isCategoryMatch } from "@/lib/utils";
import { products as staticProducts } from "@/lib/data";

// GET: List products from Supabase
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "newest";
  const featured = searchParams.get("featured");
  const slug = searchParams.get("slug");
  const limit = searchParams.get("limit");

  const supabase = createSupabaseAdminClient();

  let query = supabase
    .from("products")
    .select(`*, categories ( id, name, slug, description, image )`);

  if (slug) query = query.eq("slug", slug);

  const { data, error } = await query;

  let dbProducts: Product[] = [];
  if (!error && data) {
    dbProducts = data.map(mapDbProduct);
  }

  const dbSlugs = new Set(dbProducts.map((p) => p.slug));
  const dbIds = new Set(dbProducts.map((p) => p.id));

  // Merge static catalog products for full category coverage
  const missingStatic = staticProducts.filter(
    (p) => !dbSlugs.has(p.slug) && !dbIds.has(p.id)
  );

  let result: Product[] = [...dbProducts, ...missingStatic];

  if (category) result = result.filter((p) => isCategoryMatch(p.category, category, p.customizable));
  if (featured === "true") result = result.filter((p) => p.is_featured);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  switch (sort) {
    case "price_asc":  result.sort((a, b) => a.price - b.price); break;
    case "price_desc": result.sort((a, b) => b.price - a.price); break;
    case "rating":     result.sort((a, b) => b.rating - a.rating); break;
    case "popular":    result.sort((a, b) => b.review_count - a.review_count); break;
    default:
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  if (limit) result = result.slice(0, Number(limit));

  return NextResponse.json({ products: result, total: result.length });
}
