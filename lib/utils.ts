import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getDiscountPercent(price: number, comparePrice: number): number {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isCategoryMatch(
  category: { id?: string; name?: string; slug?: string },
  targetCategoryFilter: string,
  isCustomizable?: boolean
): boolean {
  if (!targetCategoryFilter || targetCategoryFilter === "all") return true;
  if (!category) return false;

  const rawTarget = decodeURIComponent(targetCategoryFilter).trim();
  const normalizedTargetSlug = slugify(rawTarget);
  const normalizedTargetLower = rawTarget.toLowerCase();

  // Special handling for personalised/custom category
  const isPersonalisedTarget =
    normalizedTargetSlug === "personalised-name" ||
    normalizedTargetSlug === "custom-orders" ||
    normalizedTargetSlug === "personalized-name" ||
    normalizedTargetLower === "6" ||
    normalizedTargetLower.includes("personalised") ||
    normalizedTargetLower.includes("personalized");

  if (isPersonalisedTarget) {
    const catSlug = (category.slug || "").toLowerCase().trim();
    const catName = (category.name || "").toLowerCase().trim();
    const catId = (category.id || "").toLowerCase().trim();
    return (
      catId === "6" ||
      catSlug === "personalised-name" ||
      catSlug === "custom-orders" ||
      catSlug === "personalized-name" ||
      catName.includes("personalised") ||
      catName.includes("personalized") ||
      isCustomizable === true
    );
  }

  const catId = (category.id || "").toLowerCase().trim();
  const catSlug = (category.slug || "").toLowerCase().trim();
  const catName = (category.name || "").toLowerCase().trim();
  const catSlugFromName = slugify(category.name || "");

  return (
    (catId !== "" && catId === normalizedTargetLower) ||
    (catSlug !== "" && catSlug === normalizedTargetSlug) ||
    (catSlug !== "" && catSlug === normalizedTargetLower) ||
    (catName !== "" && catName === normalizedTargetLower) ||
    (catSlugFromName !== "" && catSlugFromName === normalizedTargetSlug)
  );
}

export function findCategory<T extends { id?: string; name?: string; slug?: string }>(
  categories: T[],
  categoryFilter: string
): T | undefined {
  if (!categoryFilter || categoryFilter === "all") return undefined;
  const rawTarget = decodeURIComponent(categoryFilter).trim();
  const targetSlug = slugify(rawTarget);
  if (targetSlug === "custom-orders" || targetSlug === "personalized-name" || targetSlug === "personalised-name") {
    const customCat = categories.find((c) => {
      const s = (c.slug || "").toLowerCase();
      return s === "personalised-name" || s === "custom-orders" || s === "personalized-name";
    });
    if (customCat) return customCat;
  }
  return categories.find((cat) => isCategoryMatch(cat, categoryFilter));
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateOrderNumber(): string {
  return "PHA" + Date.now().toString().slice(-8).toUpperCase();
}

