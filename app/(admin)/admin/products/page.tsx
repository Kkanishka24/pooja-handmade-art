"use client";

import { useState } from "react";
import { products as allProducts } from "@/lib/data";
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
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">
            Products
          </h1>
          <p className="text-gray-500 text-sm">{products.length} total products</p>
        </div>
        <button
          id="add-product-btn"
          onClick={() => setShowModal(true)}
          className="btn-primary text-sm self-start"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
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
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-brand-cream">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-gray-400 text-xs">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">
                    {product.category.name}
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                      {product.compare_price && (
                        <p className="text-gray-400 text-xs line-through">
                          {formatPrice(product.compare_price)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        product.stock > 10
                          ? "text-green-600"
                          : product.stock > 0
                          ? "text-amber-600"
                          : "text-red-500"
                      )}
                    >
                      {product.stock === 999 ? "Unlimited" : `${product.stock} units`}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-gray-700">{product.rating}</span>
                      <span className="text-gray-400 text-xs">({product.review_count})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      {product.is_featured && (
                        <span className="badge-pink text-[10px] py-0.5 px-2">Featured</span>
                      )}
                      {product.is_bestseller && (
                        <span className="badge-terracotta text-[10px] py-0.5 px-2">Bestseller</span>
                      )}
                      {product.is_new && (
                        <span className="badge-green text-[10px] py-0.5 px-2">New</span>
                      )}
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
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-brand-brown">
                Add New Product
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-brand-beige rounded-2xl p-6 text-center cursor-pointer hover:border-brand-pink transition-colors">
                <Upload className="w-8 h-8 text-brand-muted mx-auto mb-2" />
                <p className="text-brand-muted text-sm">
                  Drop images here or <span className="text-brand-pink font-medium">browse</span>
                </p>
                <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>

              {[
                { label: "Product Name", placeholder: "e.g. Felt Rainbow Mobile", id: "new-product-name" },
                { label: "Price (₹)", placeholder: "e.g. 899", id: "new-product-price" },
                { label: "Compare Price (₹)", placeholder: "e.g. 1199 (optional)", id: "new-product-compare-price" },
                { label: "Stock", placeholder: "e.g. 10", id: "new-product-stock" },
                { label: "SKU", placeholder: "e.g. PHA-NUR-013", id: "new-product-sku" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Category
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink" id="new-product-category">
                  <option value="">Select category...</option>
                  <option value="nursery-decor">Nursery Décor</option>
                  <option value="festive-decorations">Festive Decorations</option>
                  <option value="home-decor">Home Décor</option>
                  <option value="gifts-hampers">Gifts & Hampers</option>
                  <option value="wall-art">Wall Art</option>
                  <option value="keychains-accessories">Keychains & Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Product description..."
                  id="new-product-description"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-ghost flex-1 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-primary flex-1 justify-center"
                  id="save-product-btn"
                >
                  Save Product
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
            <h3 className="font-display font-bold text-brand-brown text-lg mb-2">
              Delete Product?
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-2xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                id="confirm-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
