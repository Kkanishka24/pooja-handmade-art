"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  CheckCircle,
  MessageCircle,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const addressSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid 10-digit mobile number required"),
  line1: z.string().min(5, "Delivery address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().length(6, "Valid 6-digit pincode required"),
  notes: z.string().optional(),
});

type AddressForm = z.infer<typeof addressSchema>;

const POOJA_WHATSAPP_NUMBER = "919310261542";

export default function CheckoutPage() {
  const [orderSent, setOrderSent] = useState(false);
  const [waLink, setWaLink] = useState("");
  const [savedData, setSavedData] = useState<AddressForm | null>(null);
  const router = useRouter();

  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      state: "Delhi",
    },
  });

  // Redirect to shop if cart is empty and order hasn't been sent yet
  useEffect(() => {
    if (items.length === 0 && !orderSent) {
      router.push("/shop");
    }
  }, [items.length, orderSent, router]);

  const generateWhatsAppMessage = (data: AddressForm) => {
    let msg = `🛍️ *NEW ORDER - POOJA HANDMADE ART*\n\n`;
    msg += `👤 *Customer Details:*\n`;
    msg += `• *Name:* ${data.full_name}\n`;
    msg += `• *Mobile Number:* ${data.phone}\n`;
    msg += `• *Address:* ${data.line1}${data.line2 ? `, ${data.line2}` : ""}\n`;
    msg += `• *City / State:* ${data.city}, ${data.state}\n`;
    msg += `• *Pincode:* ${data.pincode}\n`;
    if (data.notes) {
      msg += `• *Special Notes:* ${data.notes}\n`;
    }

    msg += `\n📦 *Order Items (${items.length}):*\n`;
    items.forEach((item, index) => {
      const colorText = item.selectedColor ? ` (${item.selectedColor})` : "";
      const customNameText = item.customName ? ` [Custom Name: "${item.customName}"]` : "";
      msg += `${index + 1}. *${item.product.name}*${colorText}${customNameText} × ${item.quantity} — ₹${
        item.product.price * item.quantity
      }\n`;
    });

    msg += `\n----------------------------------\n`;
    msg += `💵 *Subtotal:* ₹${subtotal}\n`;
    msg += `🚚 *Shipping:* ${shipping === 0 ? "FREE" : `₹${shipping}`}\n`;
    msg += `✨ *Total Amount:* ₹${total}\n\n`;
    msg += `Please confirm my order and share payment options! 🙏`;

    return encodeURIComponent(msg);
  };

  const onSubmit = (data: AddressForm) => {
    const encodedMessage = generateWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${POOJA_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setSavedData(data);
    setWaLink(whatsappUrl);
    setOrderSent(true);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Clear local cart
    clearCart();
  };

  if (orderSent && savedData) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-card border border-brand-beige w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 border border-emerald-300 shadow-soft animate-bounce-soft">
            <MessageCircle className="w-10 h-10 text-emerald-600 fill-emerald-600" />
          </div>

          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-2 inline-block">
            Redirecting to WhatsApp
          </span>

          <h1 className="font-display font-bold text-3xl text-brand-brown mb-3">
            Order Sent to WhatsApp!
          </h1>

          <p className="text-brand-brown-light text-sm sm:text-base mb-6 leading-relaxed">
            Thank you, <strong className="text-brand-brown">{savedData.full_name}</strong>! Your order details and delivery address have been sent to Pooja on WhatsApp (+91 93102 61542).
          </p>

          <div className="bg-brand-cream rounded-2xl p-4 mb-6 text-left space-y-2 border border-brand-beige text-xs sm:text-sm">
            <p className="text-brand-muted font-semibold uppercase tracking-wider text-[11px]">
              Delivery Summary:
            </p>
            <p className="text-brand-brown font-medium">
              📱 {savedData.phone}
            </p>
            <p className="text-brand-brown">
              📍 {savedData.line1}, {savedData.city}, {savedData.state} - {savedData.pincode}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-soft text-base"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Open WhatsApp Chat Again
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>

            <Link href="/shop" className="btn-secondary w-full justify-center py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-6 md:py-10">
      <div className="container-brand">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-brown hover:text-brand-pink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            Order directly via WhatsApp
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Mobile & Address Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-beige">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-beige/60">
              <div className="w-10 h-10 rounded-2xl bg-brand-pink-light flex items-center justify-center border border-brand-pink/30">
                <MapPin className="w-5 h-5 text-brand-pink-dark" />
              </div>
              <div>
                <h1 className="font-display font-bold text-brand-brown text-xl sm:text-2xl">
                  Delivery Details
                </h1>
                <p className="text-brand-muted text-xs">
                  Enter your address & mobile number to send your order on WhatsApp
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    {...register("full_name")}
                    placeholder="Enter your full name"
                    className="input-brand"
                    id="full-name"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="e.g. 9310261542"
                    className="input-brand"
                    id="phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                  Delivery Address (House / Flat No., Street, Area) *
                </label>
                <input
                  {...register("line1")}
                  placeholder="e.g. House No. 42, Green Park Main"
                  className="input-brand"
                  id="address-line1"
                />
                {errors.line1 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.line1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                  Landmark / Sector (Optional)
                </label>
                <input
                  {...register("line2")}
                  placeholder="e.g. Near Metro Station"
                  className="input-brand"
                  id="address-line2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                    City *
                  </label>
                  <input
                    {...register("city")}
                    placeholder="New Delhi"
                    className="input-brand"
                    id="city"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                    State *
                  </label>
                  <input
                    {...register("state")}
                    placeholder="Delhi"
                    className="input-brand"
                    id="state"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                    Pincode *
                  </label>
                  <input
                    {...register("pincode")}
                    placeholder="110016"
                    maxLength={6}
                    className="input-brand"
                    id="pincode"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                  Special Notes / Custom Colors (Optional)
                </label>
                <textarea
                  {...register("notes")}
                  placeholder="Mention any custom color requests or gift note requests here..."
                  rows={2}
                  className="input-brand resize-none"
                  id="notes"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  id="place-order-whatsapp-btn"
                  className="btn-primary w-full justify-center py-4 bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-soft text-base font-semibold transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  Proceed to WhatsApp Order ({formatPrice(total)})
                </button>
                <p className="text-center text-xs text-brand-muted mt-2">
                  Clicking will open WhatsApp with your item list & address pre-filled to message Pooja (+91 93102 61542).
                </p>
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-beige sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-brand-beige mb-4">
                <h3 className="font-display font-bold text-brand-brown text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-pink-dark" />
                  Order Summary
                </h3>
                <span className="text-xs font-semibold text-brand-muted">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-5 divide-y divide-brand-beige/40">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor || ""}-${item.customName || ""}`} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-brand-beige">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-pink text-brand-brown text-[10px] font-bold flex items-center justify-center shadow-soft">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-brown text-sm font-semibold line-clamp-1">
                        {item.product.name}
                      </p>
                      {item.selectedColor && (
                        <p className="text-[11px] text-brand-muted">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      <p className="text-brand-muted text-xs mt-0.5">
                        {formatPrice(item.product.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-display font-bold text-brand-brown text-sm shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-beige pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-brown">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-700 font-semibold" : "font-medium text-brand-brown"}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-display font-bold text-brand-brown text-lg pt-3 border-t border-brand-beige">
                  <span>Total Amount</span>
                  <span className="text-brand-brown text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-5 p-3.5 bg-emerald-50 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800 border border-emerald-200">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {shipping === 0
                    ? "Free pan-India shipping unlocked!"
                    : `Add ${formatPrice(999 - subtotal)} more for free shipping`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
