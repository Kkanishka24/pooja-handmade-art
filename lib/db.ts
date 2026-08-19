import { Product, Category } from "@/types";

interface DbProductRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number | string;
  compare_price: number | string | null;
  images: string[] | null;
  category_id: string | null;
  categories?: { name: string; slug: string; description?: string | null; image?: string | null } | null;
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  tags: string[] | null;
  rating: number | string;
  review_count: number;
  sku: string | null;
  weight: string | null;
  dimensions: string | null;
  materials: string[] | null;
  colors: string[] | null;
  customizable: boolean;
  created_at: string;
}

// Map a Supabase products row to the storefront Product type
export function mapDbProduct(row: DbProductRow): Product {
  const cat = row.categories;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
    short_description: row.short_description || "",
    price: Number(row.price),
    compare_price: row.compare_price != null ? Number(row.compare_price) : undefined,
    images: row.images || [],
    category: {
      id: row.category_id || "",
      name: cat?.name || "Uncategorized",
      slug: cat?.slug || "uncategorized",
      description: cat?.description || "",
      image: cat?.image || "",
    },
    category_id: row.category_id || "",
    stock: row.stock ?? 0,
    is_featured: row.is_featured ?? false,
    is_new: row.is_new ?? false,
    is_bestseller: row.is_bestseller ?? false,
    tags: row.tags || [],
    rating: Number(row.rating) || 0,
    review_count: row.review_count ?? 0,
    sku: row.sku || "",
    weight: row.weight || undefined,
    dimensions: row.dimensions || undefined,
    materials: row.materials || [],
    colors: row.colors || [],
    customizable: row.customizable ?? false,
    created_at: row.created_at,
  };
}

// Map a Supabase categories row to the storefront Category type
export function mapDbCategory(row: {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  product_count?: number;
}): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
    image: row.image || "",
    product_count: row.product_count,
  };
}
