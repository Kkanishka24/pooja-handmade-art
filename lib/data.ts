import { Category, Product, Review } from "@/types";

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: "1",
    name: "Cute Plush Ornaments without Bell",
    slug: "cute-plush-ornaments-without-bell",
    description: "Soft plush felt animals & cute ornaments hand-stitched without bells",
    image: "/images/products/felt-sleeping-bear.jpg",
    product_count: 3,
    color: "bg-brand-pink-light",
  },
  {
    id: "2",
    name: "Cute Plush Ornaments with Bell",
    slug: "cute-plush-ornaments-with-bell",
    description: "Charming plush felt ornaments featuring gentle chiming ghungroo bells",
    image: "/images/products/felt-birds-mobile.jpg",
    product_count: 2,
    color: "bg-brand-lavender",
  },
  {
    id: "3",
    name: "Door and Wall Decor",
    slug: "door-and-wall-decor",
    description: "Whimsical hand-stitched felt branch hangings, torans, and wall art",
    image: "/images/products/owl-branch-hanging.jpg",
    product_count: 4,
    color: "bg-brand-green-light",
  },
  {
    id: "4",
    name: "Festive Special Decor",
    slug: "festive-special-decor",
    description: "Vibrant handcrafted felt Diyas, tassels, torans & festive celebration accents",
    image: "/images/products/diya-hanging-tassels.jpg",
    product_count: 3,
    color: "bg-brand-terracotta-light",
  },
  {
    id: "5",
    name: "Garden Decor",
    slug: "garden-decor",
    description: "Enchanting nature-inspired felt birds, flowers, and outdoor balcony hangings",
    image: "/images/products/diya-hanging-bells.jpg",
    product_count: 2,
    color: "bg-brand-yellow",
  },
  {
    id: "6",
    name: "Personalised Name",
    slug: "personalised-name",
    description: "Handcrafted felt creations with custom names, initials, and personalized colors",
    image: "/images/products/owl-branch-hanging.jpg",
    product_count: 4,
    color: "bg-brand-pink-light",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "1",
    name: "Handcrafted Festive Diya Bell Hanging",
    slug: "handcrafted-festive-diya-bell-hanging",
    description:
      "Brighten your home with this exquisite handcrafted felt Diya hanging ornament. Featuring a bright lime-green felt diya base, flame motif, hand-sewn leaf appliques, colorful bead strands, and traditional brass ghungroo bells that create a gentle musical chime. Hand-stitched with love, making it a perfect piece for Diwali, Puja rooms, entrance doors, and festive gifting.",
    short_description: "Vibrant felt Diya ornament with embroidered leaves, beads & brass ghungroo bells",
    price: 499,
    compare_price: 699,
    images: [
      "/images/products/diya-hanging-bells.jpg",
    ],
    category: categories[3],
    category_id: "4",
    stock: 15,
    is_featured: true,
    is_new: true,
    is_bestseller: true,
    tags: ["festive", "diya", "diwali", "puja decor", "handmade", "bells", "toran"],
    rating: 4.9,
    review_count: 28,
    sku: "PHA-FES-001",
    weight: "150g",
    materials: ["Premium Wool Felt", "Wooden & Glass Beads", "Brass Ghungroo Bells", "Embroidery Thread"],
    colors: ["Lime Green & Orange", "Multicolor"],
    customizable: true,
    created_at: "2024-01-15",
  },
  {
    id: "2",
    name: "Royal Magenta Diya Fringe Wall Hanging",
    slug: "royal-magenta-diya-fringe-wall-hanging",
    description:
      "A stunning festive accent crafted from premium magenta felt with delicate stitch work and leaf embroidery. Features a long, lush green tassel fringe accented with cascading brass ghungroo bells that add grace and movement to your doorways, balconies, or living space during auspicious celebrations.",
    short_description: "Elegantly crafted magenta felt Diya with green tassel fringe & cascading brass bells",
    price: 549,
    compare_price: 749,
    images: [
      "/images/products/diya-hanging-tassels.jpg",
    ],
    category: categories[3],
    category_id: "4",
    stock: 12,
    is_featured: true,
    is_new: false,
    is_bestseller: false,
    tags: ["diya", "tassel", "festive decor", "wall hanging", "handmade", "diwali"],
    rating: 4.8,
    review_count: 19,
    sku: "PHA-FES-002",
    weight: "180g",
    materials: ["Premium Wool Felt", "Silk Thread Fringe", "Brass Ghungroo Bells"],
    colors: ["Magenta & Green", "Golden Flame"],
    customizable: true,
    created_at: "2024-01-20",
  },
  {
    id: "3",
    name: "Three Wise Owls Felt Branch Wall Hanging",
    slug: "three-wise-owls-felt-branch-wall-hanging",
    description:
      "Bring warmth and playful charm to your walls with this detailed owl branch hanging. Three adorable felt owls in vibrant pink, blue, and orange hues perch on a soft stuffed green branch detailed with sparkling yellow flowers and trailing beaded strings with chime bells. Each owl is meticulously stitched with button accents and sequin embellishments.",
    short_description: "Handcrafted tree branch featuring 3 colorful embroidered felt owls with yellow flowers & chime bells",
    price: 899,
    compare_price: 1199,
    images: [
      "/images/products/owl-branch-hanging.jpg",
    ],
    category: categories[2],
    category_id: "3",
    stock: 8,
    is_featured: true,
    is_new: true,
    is_bestseller: true,
    tags: ["owl decor", "branch hanging", "wall art", "handmade", "chime bells"],
    rating: 5.0,
    review_count: 34,
    sku: "PHA-WAL-001",
    weight: "250g",
    materials: ["Hand-stitched Wool Felt", "Decorative Buttons & Sequins", "Wooden Beads", "Brass Bells"],
    colors: ["Multicolor Owls", "Forest Green Branch"],
    customizable: true,
    created_at: "2024-02-01",
  },
  {
    id: "4",
    name: "Cozy Paws Felt Sleeping Bear Plush",
    slug: "cozy-paws-felt-sleeping-bear-plush",
    description:
      "Fall in love with this adorable sleeping bear, lovingly hand-stitched with visible contrast blanket embroidery stitches. Crafted from soft cream felt, wearing stylish black overalls with pocket detail and a purple neck scarf. Perfect as a nursery accent, bag charm, tree ornament, or thoughtful handmade gift.",
    short_description: "Hand-stitched felt teddy bear wearing cute black overalls and a purple scarf",
    price: 399,
    compare_price: 499,
    images: [
      "/images/products/felt-sleeping-bear.jpg",
    ],
    category: categories[0],
    category_id: "1",
    stock: 20,
    is_featured: true,
    is_new: false,
    is_bestseller: true,
    tags: ["teddy bear", "nursery ornament", "plush", "handmade", "gift"],
    rating: 4.9,
    review_count: 42,
    sku: "PHA-PLU-001",
    weight: "110g",
    materials: ["Hypoallergenic Wool Felt", "Polyfill Cotton", "Embroidery Floss"],
    colors: ["Cream & Black", "Purple Scarf"],
    customizable: false,
    created_at: "2024-02-10",
  },
  {
    id: "5",
    name: "Enchanted Birds & Branch Hanging Mobile",
    slug: "enchanted-birds-branch-hanging-mobile",
    description:
      "Transform any room into a vibrant paradise with this showstopping felt birds hanging mobile. Features 4 brightly colored songbirds perched atop a hand-sculpted green branch adorned with blossoms, with 6 charming suspended birds swaying gently below. Hand-stitched with vibrant felt art details, making it a dream piece for living rooms, entrance doorways, or baby nurseries.",
    short_description: "Spectacular handcrafted felt mobile with 10 colorful birds perched & suspended on a green branch",
    price: 1299,
    compare_price: 1699,
    images: [
      "/images/products/felt-birds-mobile.jpg",
    ],
    category: categories[4],
    category_id: "5",
    stock: 6,
    is_featured: true,
    is_new: true,
    is_bestseller: true,
    tags: ["bird mobile", "nursery decor", "hanging mobile", "handcrafted art", "statement piece"],
    rating: 5.0,
    review_count: 56,
    sku: "PHA-NUR-001",
    weight: "320g",
    materials: ["Premium Colorfast Felt", "Soft Fiber Fill", "Strong Cotton Cord", "Button Details"],
    colors: ["Multicolor Songbirds", "Deep Green Branch"],
    customizable: true,
    created_at: "2024-02-15",
  },
];

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const testimonials: Review[] = [
  {
    id: "r1",
    product_id: "5",
    user_id: "u1",
    user_name: "Priya Sharma",
    user_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    comment:
      "The Enchanted Birds Mobile is breathtaking! The bright colors of the birds and the delicate stitching on the branch look even more gorgeous in real life. It instantly transformed our living room balcony entry. Pooja packed it so beautifully with a handwritten note!",
    created_at: "2024-03-10",
    verified: true,
  },
  {
    id: "r2",
    product_id: "1",
    user_id: "u2",
    user_name: "Ananya Patel",
    user_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    comment:
      "The Festive Diya hanging was the star decor at our Puja setup! The little brass ghungroo bells have such a soothing, pleasant sound when a gentle breeze blows. Absolutely worth every penny.",
    created_at: "2024-02-20",
    verified: true,
  },
  {
    id: "r3",
    product_id: "3",
    user_id: "u3",
    user_name: "Sneha Kulkarni",
    user_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    comment:
      "Ordered the Three Wise Owls branch hanging for my kids' room, and they fell in love immediately! The button eyes and sequin details are so neat. You can really tell so much love goes into every stitch.",
    created_at: "2024-03-01",
    verified: true,
  },
  {
    id: "r4",
    product_id: "4",
    user_id: "u4",
    user_name: "Meera Reddy",
    user_avatar: "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=100&q=80",
    rating: 5,
    comment:
      "The little sleeping bear plush in overalls is SO adorable! Super soft, cute purple scarf detail, and high quality stitching. Fits right on my desk companion shelf. Will definitely buy more as return gifts!",
    created_at: "2024-02-14",
    verified: true,
  },
];

// ─── Instagram Gallery ────────────────────────────────────────────────────────
export const instagramImages = [
  "/images/products/diya-hanging-bells.jpg",
  "/images/products/diya-hanging-tassels.jpg",
  "/images/products/owl-branch-hanging.jpg",
  "/images/products/felt-sleeping-bear.jpg",
  "/images/products/felt-birds-mobile.jpg",
  "/images/products/owl-branch-hanging.jpg",
];

// Helpers
export const getFeaturedProducts = () => products.filter((p) => p.is_featured);
export const getBestSellers = () => products.filter((p) => p.is_bestseller);
export const getNewArrivals = () => products.filter((p) => p.is_new);
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
export const getProductsByCategory = (categorySlug: string) =>
  products.filter((p) => p.category.slug === categorySlug);
