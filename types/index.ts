// ─── Product ───────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_price?: number;
  images: string[];
  category: Category;
  category_id: string;
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  tags: string[];
  rating: number;
  review_count: number;
  sku: string;
  weight?: string;
  dimensions?: string;
  materials?: string[];
  colors?: string[];
  customizable: boolean;
  created_at: string;
}

// ─── Category ─────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count?: number;
  color?: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customName?: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shipping_address: Address;
  payment_id?: string;
  payment_method: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  total: number;
}

// ─── Address ──────────────────────────────────────────────────────────────────
export interface Address {
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  created_at: string;
  verified: boolean;
}

// ─── User / Profile ───────────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  addresses: Address[];
  is_admin: boolean;
  created_at: string;
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────
export interface WishlistItem {
  product: Product;
  added_at: string;
}

// ─── Filters ─────────────────────────────────────────────────────────────────
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  inStockOnly?: boolean;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popular" | "rating";
  search?: string;
}

// ─── Newsletter ──────────────────────────────────────────────────────────────
export interface NewsletterSubscription {
  email: string;
  name?: string;
}

// ─── Analytics ───────────────────────────────────────────────────────────────
export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
  revenue_change: number;
  orders_change: number;
  customers_change: number;
}
