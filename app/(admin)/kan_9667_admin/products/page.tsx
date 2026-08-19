"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { formatPrice } from "@/lib/utils";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Star,
  Package,
  X,
  Upload,
  RefreshCw,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_price?: number;
  images: string[];
  stock: number;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  sku: string;
  category_id?: string;
  description?: string;
  colors: string[];
  materials: string[];
  categories?: { name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductForm {
  name: string;
  price: string;
  compare_price: string;
  stock: string;
  sku: string;
  category_id: string;
  description: string;
  colors: string;
  materials: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
}

const EMPTY_FORM: ProductForm = {
  name: "",
  price: "",
  compare_price: "",
  stock: "",
  sku: "",
  category_id: "",
  description: "",
  colors: "",
  materials: "",
  is_featured: false,
  is_bestseller: false,
  is_new: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal state — editingProduct is set when editing, null when adding
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.ok ? res.json() : { categories: [] })
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  // Open modal for adding a new product
  const openAddModal = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setUploadedImages([]);
    setSaveError("");
    setShowModal(true);
  };

  // Open modal pre-filled with existing product data
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: String(product.price),
      compare_price: product.compare_price ? String(product.compare_price) : "",
      stock: String(product.stock),
      sku: product.sku || "",
      category_id: product.category_id || "",
      description: product.description || "",
      colors: (product.colors || []).join(", "),
      materials: (product.materials || []).join(", "),
      is_featured: product.is_featured,
      is_bestseller: product.is_bestseller,
      is_new: product.is_new,
    });
    setUploadedImages(product.images || []);
    setSaveError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setUploadedImages([]);
    setSaveError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        urls.push(data.url);
      }
    }
    setUploadedImages((prev) => [...prev, ...urls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveProduct = async () => {
    if (!form.name || !form.price) {
      setSaveError("Name and price are required.");
      return;
    }
    setSaving(true);
    setSaveError("");

    const payload: Record<string, unknown> = {
      name: form.name,
      price: parseFloat(form.price),
      compare_price: form.compare_price ? parseFloat(form.compare_price) : null,
      stock: parseInt(form.stock) || 0,
      sku: form.sku || null,
      category_id: form.category_id || null,
      description: form.description || null,
      colors: form.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      materials: form.materials
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      images: uploadedImages,
      is_featured: form.is_featured,
      is_bestseller: form.is_bestseller,
      is_new: form.is_new,
    };

    let res: Response;

    if (editingProduct) {
      // PATCH — update existing product
      res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingProduct.id, ...payload }),
      });
    } else {
      // POST — create new product
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      payload.slug = `${slug}-${Date.now()}`;

      res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    if (res.ok) {
      closeModal();
      fetchProducts();
    } else {
      const err = await res.json();
      setSaveError(err.error || "Failed to save product.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    setDeleting(false);
  };

  const isEditing = !!editingProduct;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">Products</h1>
          <p className="text-gray-500 text-sm">
            {loading ? "Loading..." : `${products.length} total products`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            className="btn-ghost border border-gray-200 p-2.5"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            id="add-product-btn"
            onClick={openAddModal}
            className="btn-primary text-sm"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="product-search"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink bg-white"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Product</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Price</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Stock</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Rating</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-4">
                      <div className="h-10 bg-gray-50 rounded-xl animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    {search ? "No products match your search" : "No products yet — add your first!"}
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-brand-cream">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-gray-400 text-xs">{product.sku || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                      {product.categories?.name || "Uncategorized"}
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{formatPrice(product.price)}</p>
                        {product.compare_price && (
                          <p className="text-gray-400 text-xs line-through">{formatPrice(product.compare_price)}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className={cn(
                        "text-xs font-medium",
                        product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-500"
                      )}>
                        {product.stock === 999 ? "Unlimited" : `${product.stock} units`}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-700">{product.rating || "—"}</span>
                        <span className="text-gray-400 text-xs">({product.review_count || 0})</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1">
                        {product.is_featured && <span className="badge-pink text-[10px] py-0.5 px-2">Featured</span>}
                        {product.is_bestseller && <span className="badge-terracotta text-[10px] py-0.5 px-2">Bestseller</span>}
                        {product.is_new && <span className="badge-green text-[10px] py-0.5 px-2">New</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <a
                          href={`/shop/${product.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 rounded-lg hover:bg-brand-pink-light text-gray-500 hover:text-brand-pink-dark transition-colors"
                          aria-label="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-brand-brown">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Product Images
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-brand-beige rounded-2xl p-6 text-center cursor-pointer hover:border-brand-pink transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="w-8 h-8 text-brand-pink mx-auto mb-2 animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 text-brand-muted mx-auto mb-2" />
                  )}
                  <p className="text-brand-muted text-sm">
                    {uploading ? "Uploading..." : <><span className="text-brand-pink font-medium">Click to upload</span> or drop images here</>}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {uploadedImages.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {uploadedImages.map((url, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setUploadedImages((prev) => prev.filter((_, j) => j !== i))}
                          className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {[
                { label: "Product Name *", key: "name", placeholder: "e.g. Felt Rainbow Mobile" },
                { label: "Price (₹) *", key: "price", placeholder: "e.g. 899" },
                { label: "Compare Price (₹)", key: "compare_price", placeholder: "e.g. 1199 (optional)" },
                { label: "Stock", key: "stock", placeholder: "e.g. 10" },
                { label: "SKU", key: "sku", placeholder: "e.g. PHA-NUR-013" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    id={`product-field-${field.key}`}
                    value={form[field.key as keyof ProductForm] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Category
                </label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink"
                  id="product-field-category"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Product description..."
                  id="product-field-description"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Colors / Variants
                </label>
                <input
                  id="product-field-colors"
                  value={form.colors}
                  onChange={(e) => setForm((f) => ({ ...f, colors: e.target.value }))}
                  placeholder="e.g. Blush Pink, Sage Green, Rainbow"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Comma-separated list — each color becomes a variant option on the product page.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Materials Used
                </label>
                <input
                  id="product-field-materials"
                  value={form.materials}
                  onChange={(e) => setForm((f) => ({ ...f, materials: e.target.value }))}
                  placeholder="e.g. Premium Wool Felt, Wooden Beads, Brass Bells"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Comma-separated list — shown as chips in the "Materials Used" section on the product page.
                </p>
              </div>

              {/* Flags */}
              <div className="flex gap-4">
                {[
                  { key: "is_featured", label: "Featured" },
                  { key: "is_bestseller", label: "Bestseller" },
                  { key: "is_new", label: "New Arrival" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[key as keyof ProductForm] as boolean}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
                      className="w-4 h-4 accent-brand-pink"
                    />
                    {label}
                  </label>
                ))}
              </div>

              {saveError && (
                <p className="text-red-500 text-sm text-center">{saveError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={closeModal}
                  className="btn-ghost flex-1 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  disabled={saving || uploading}
                  className="btn-primary flex-1 justify-center"
                  id="save-product-btn"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isEditing ? "Updating..." : "Saving..."}
                    </span>
                  ) : (
                    isEditing ? "Update Product" : "Save Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-slide-up text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-display font-bold text-brand-brown text-lg mb-2">Delete Product?</h3>
            <p className="text-gray-500 text-sm mb-5">This will permanently remove the product from your store.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-2xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60"
                id="confirm-delete-btn"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
