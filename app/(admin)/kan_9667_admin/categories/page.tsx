"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Upload,
  RefreshCw,
  Loader2,
  FolderOpen,
} from "lucide-react";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  product_count: number;
}

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const EMPTY_FORM: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  image: "",
};

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [form, setForm] = useState<CategoryForm>(EMPTY_FORM);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    if (res.ok) {
      const data = await res.json();
      setCategories(data.categories || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setSaveError("");
    setShowModal(true);
  };

  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
      image: cat.image || "",
    });
    setSaveError("");
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.url }));
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!form.name) {
      setSaveError("Category name is required.");
      return;
    }
    const slug = form.slug.trim() || toSlug(form.name);
    if (editing && slug !== editing.slug) {
      setSaveError("Slug cannot be changed after creation.");
      return;
    }
    setSaving(true);
    setSaveError("");

    const payload = {
      name: form.name,
      slug: editing ? editing.slug : `${slug}-${Date.now()}`,
      description: form.description || null,
      image: form.image || null,
    };

    const res = await fetch("/api/admin/categories", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing.id, ...payload } : payload),
    });

    if (res.ok) {
      setShowModal(false);
      fetchCategories();
    } else {
      const err = await res.json();
      setSaveError(err.error || "Failed to save category.");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
    setDeleting(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">Categories</h1>
          <p className="text-gray-500 text-sm">
            {loading ? "Loading..." : `${categories.length} total categories`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchCategories}
            className="btn-ghost border border-gray-200 p-2.5"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            id="add-category-btn"
            onClick={openAdd}
            className="btn-primary text-sm"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink bg-white"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Slug</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Description</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Products</th>
                <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-5 py-4">
                      <div className="h-10 bg-gray-50 rounded-xl animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-400">
                    <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    {search ? "No categories match your search" : "No categories yet — add your first!"}
                  </td>
                </tr>
              ) : (
                filtered.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-brand-cream">
                          {cat.image ? (
                            <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <FolderOpen className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900">{cat.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs font-mono hidden md:table-cell">
                      {cat.slug}
                    </td>
                    <td className="px-5 py-4 text-gray-600 hidden lg:table-cell max-w-xs">
                      <p className="line-clamp-1">{cat.description || "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-cream text-brand-brown text-xs font-medium">
                        {cat.product_count} {cat.product_count === 1 ? "product" : "products"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <a
                          href={`/shop?category=${cat.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEdit(cat)}
                          className="p-1.5 rounded-lg hover:bg-brand-pink-light text-gray-500 hover:text-brand-pink-dark transition-colors"
                          aria-label="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(cat.id)}
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

      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl text-brand-brown">
                {editing ? "Edit Category" : "Add New Category"}
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
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Category Image
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
                    {uploading ? "Uploading..." : <>Drop an image here or <span className="text-brand-pink font-medium">browse</span></>}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {form.image && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.image} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                        className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Category Name *
                </label>
                <input
                  id="new-category-name"
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({
                      ...f,
                      name,
                      slug: editing ? f.slug : toSlug(name),
                    }));
                  }}
                  placeholder="e.g. Cute Plush Ornaments without Bell"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Slug
                </label>
                <input
                  id="new-category-slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  readOnly={!!editing}
                  placeholder="auto-generated from name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink disabled:bg-gray-50 disabled:text-gray-400"
                />
                {editing && (
                  <p className="text-gray-400 text-xs mt-1">Slug cannot be changed once created.</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Category description..."
                  id="new-category-description"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink resize-none"
                />
              </div>

              {saveError && (
                <p className="text-red-500 text-sm text-center">{saveError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-ghost flex-1 border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading}
                  className="btn-primary flex-1 justify-center"
                  id="save-category-btn"
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </span>
                  ) : (
                    editing ? "Update Category" : "Save Category"
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
            <h3 className="font-display font-bold text-brand-brown text-lg mb-2">Delete Category?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Products in this category will become uncategorized.
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
                disabled={deleting}
                className="flex-1 py-2.5 rounded-2xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60"
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
