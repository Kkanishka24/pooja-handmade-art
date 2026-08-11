-- ================================================================
-- Pooja Handmade Art — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Categories ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  image       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ─── Products ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  short_description TEXT,
  price            NUMERIC(10,2) NOT NULL,
  compare_price    NUMERIC(10,2),
  images           TEXT[] DEFAULT '{}',
  category_id      UUID REFERENCES categories(id) ON DELETE SET NULL,
  stock            INTEGER DEFAULT 0,
  is_featured      BOOLEAN DEFAULT false,
  is_new           BOOLEAN DEFAULT false,
  is_bestseller    BOOLEAN DEFAULT false,
  tags             TEXT[] DEFAULT '{}',
  rating           NUMERIC(3,2) DEFAULT 0,
  review_count     INTEGER DEFAULT 0,
  sku              TEXT UNIQUE,
  weight           TEXT,
  dimensions       TEXT,
  materials        TEXT[] DEFAULT '{}',
  colors           TEXT[] DEFAULT '{}',
  customizable     BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ─── Profiles (extends Supabase auth.users) ──────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT,
  phone      TEXT,
  avatar_url TEXT,
  is_admin   BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Addresses ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS addresses (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name  TEXT NOT NULL,
  phone      TEXT NOT NULL,
  line1      TEXT NOT NULL,
  line2      TEXT,
  city       TEXT NOT NULL,
  state      TEXT NOT NULL,
  pincode    TEXT NOT NULL,
  country    TEXT DEFAULT 'India',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Orders ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number     TEXT NOT NULL UNIQUE,
  user_id          UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status           TEXT DEFAULT 'confirmed' CHECK (status IN ('pending','confirmed','processing','shipped','out_for_delivery','delivered','cancelled')),
  subtotal         NUMERIC(10,2) NOT NULL,
  shipping         NUMERIC(10,2) DEFAULT 0,
  discount         NUMERIC(10,2) DEFAULT 0,
  total            NUMERIC(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_id       TEXT,
  payment_method   TEXT DEFAULT 'razorpay',
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ─── Order Items ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,
  product_image TEXT,
  quantity      INTEGER NOT NULL DEFAULT 1,
  price         NUMERIC(10,2) NOT NULL,
  total         NUMERIC(10,2) NOT NULL
);

-- ─── Reviews ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES profiles(id) ON DELETE SET NULL,
  rating     SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT,
  verified   BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Wishlist ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- ─── Newsletter ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      TEXT NOT NULL UNIQUE,
  name       TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Contact Messages ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  read       BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ================================================================
-- Indexes
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_products_category    ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug        ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured    ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_orders_user          ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status        ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product      ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user        ON wishlist(user_id);

-- ================================================================
-- Row Level Security
-- ================================================================
ALTER TABLE profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders     ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews    ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist   ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses  ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own
CREATE POLICY "Users see own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Orders: users see their own orders; admins see all
CREATE POLICY "Users see own orders"    ON orders   FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins see all orders"   ON orders   FOR ALL    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Wishlist: users manage their own
CREATE POLICY "Users manage wishlist"   ON wishlist FOR ALL    USING (auth.uid() = user_id);

-- Reviews: anyone can read, authenticated users can write
CREATE POLICY "Anyone reads reviews"    ON reviews  FOR SELECT USING (true);
CREATE POLICY "Auth users write reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Products & categories: public read
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads products"    ON products   FOR SELECT USING (true);
CREATE POLICY "Public reads categories"  ON categories FOR SELECT USING (true);
CREATE POLICY "Admins manage products"   ON products   FOR ALL    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
CREATE POLICY "Admins manage categories" ON categories FOR ALL    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ================================================================
-- Auto-create profile on signup
-- ================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ================================================================
-- Seed Categories
-- ================================================================
INSERT INTO categories (name, slug, description, image) VALUES
  ('Nursery Décor',          'nursery-decor',           'Adorable handcrafted pieces for your little one''s room',   'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80'),
  ('Festive Decorations',    'festive-decorations',     'Bring joy and color to every celebration',                  'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=600&q=80'),
  ('Home Décor',             'home-decor',              'Handcrafted art to warm up your living spaces',             'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80'),
  ('Gifts & Hampers',        'gifts-hampers',           'Unique handmade gifts for every occasion',                  'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&q=80'),
  ('Wall Art',               'wall-art',                'Felt wall art to express your unique style',                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'),
  ('Keychains & Accessories','keychains-accessories',   'Cute felt accessories for everyday carry',                  'https://images.unsplash.com/photo-1583394293214-4dfabf6a98d6?w=600&q=80')
ON CONFLICT (slug) DO NOTHING;
