-- ================================================================
-- One-time sync: replace old categories with the shop-page categories
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)
-- Products linked to a deleted category become "Uncategorized"
-- (products.category_id is ON DELETE SET NULL).
-- ================================================================

DELETE FROM categories
WHERE slug IN (
  'nursery-decor', 'festive-decorations', 'home-decor',
  'gifts-hampers', 'wall-art', 'keychains-accessories'
);

INSERT INTO categories (name, slug, description, image) VALUES
  ('Cute Plush Ornaments without Bell', 'cute-plush-ornaments-without-bell', 'Soft plush felt animals & cute ornaments hand-stitched without bells', '/images/products/felt-sleeping-bear.jpg'),
  ('Cute Plush Ornaments with Bell',    'cute-plush-ornaments-with-bell',    'Charming plush felt ornaments featuring gentle chiming ghungroo bells', '/images/products/felt-birds-mobile.jpg'),
  ('Door and Wall Decor',               'door-and-wall-decor',               'Whimsical hand-stitched felt branch hangings, torans, and wall art', '/images/products/owl-branch-hanging.jpg'),
  ('Festive Special Decor',             'festive-special-decor',             'Vibrant handcrafted felt Diyas, tassels, torans & festive celebration accents', '/images/products/diya-hanging-tassels.jpg'),
  ('Garden Decor',                      'garden-decor',                      'Enchanting nature-inspired felt birds, flowers, and outdoor balcony hangings', '/images/products/diya-hanging-bells.jpg'),
  ('Personalised Name',                 'personalised-name',                 'Handcrafted felt creations with custom names, initials, and personalized colors', '/images/products/owl-branch-hanging.jpg')
ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  image       = EXCLUDED.image;
