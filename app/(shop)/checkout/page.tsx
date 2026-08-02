"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MapPin,
  CreditCard,
  CheckCircle,
  ChevronRight,
  Lock,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const addressSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  line1: z.string().min(5, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().length(6, "Valid 6-digit pincode required"),
});

type AddressForm = z.infer<typeof addressSchema>;

const steps = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: CheckCircle },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<AddressForm>({ resolver: zodResolver(addressSchema), mode: "onChange" });

  const onAddressSubmit = () => {
    if (isValid) setStep(2);
  };

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000)); // Simulate Razorpay flow
    clearCart();
    setOrderPlaced(true);
    setProcessing(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-brand-green-light flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce-soft">
            🎉
          </div>
          <h1 className="font-display font-bold text-3xl text-brand-brown mb-3">
            Order Placed!
          </h1>
          <p className="text-brand-muted mb-2">
            Thank you for your order! Your handmade items are being prepared
            with love.
          </p>
          <p className="text-brand-muted text-sm mb-8">
            You&apos;ll receive a confirmation email shortly at{" "}
            <strong>{getValues("email")}</strong>
          </p>
          <div className="flex gap-3 justify-center">
            <a href="/order-tracking" className="btn-primary">
              Track Order
            </a>
            <a href="/shop" className="btn-secondary">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="bg-white border-b border-brand-beige">
        <div className="container-brand py-8">
          <h1 className="section-title">Checkout</h1>
        </div>
      </div>

      <div className="container-brand py-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                  step >= s.id
                    ? "bg-brand-pink text-brand-brown font-semibold"
                    : "bg-white text-brand-muted border border-brand-beige"
                )}
              >
                <s.icon className="w-4 h-4" />
                <span className="text-sm">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 mx-1 transition-colors duration-300",
                    step > s.id ? "bg-brand-pink" : "bg-brand-beige"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-brand-pink-light flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brand-pink-dark" />
                  </div>
                  <h2 className="font-display font-semibold text-brand-brown text-xl">
                    Delivery Address
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                        Full Name *
                      </label>
                      <input
                        {...register("full_name")}
                        placeholder="Priya Sharma"
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
                        Phone Number *
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="+91 98765 43210"
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
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      placeholder="priya@example.com"
                      type="email"
                      className="input-brand"
                      id="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                      Address Line 1 *
                    </label>
                    <input
                      {...register("line1")}
                      placeholder="House / Flat no., Street, Area"
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
                      Address Line 2
                    </label>
                    <input
                      {...register("line2")}
                      placeholder="Landmark (optional)"
                      className="input-brand"
                      id="address-line2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                        City *
                      </label>
                      <input
                        {...register("city")}
                        placeholder="Mumbai"
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
                        placeholder="Maharashtra"
                        className="input-brand"
                        id="state"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                        Pincode *
                      </label>
                      <input
                        {...register("pincode")}
                        placeholder="400001"
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

                  <button type="submit" className="btn-primary w-full justify-center py-4 mt-2">
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-brand-pink-light flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-brand-pink-dark" />
                  </div>
                  <h2 className="font-display font-semibold text-brand-brown text-xl">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      id: "razorpay",
                      label: "Online Payment",
                      subtitle: "UPI, Cards, Net Banking, Wallets",
                      icon: "💳",
                    },
                    {
                      id: "cod",
                      label: "Cash on Delivery",
                      subtitle: "Pay when your order arrives",
                      icon: "📦",
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      id={`payment-${method.id}`}
                      onClick={() => setPaymentMethod(method.id as "razorpay" | "cod")}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left",
                        paymentMethod === method.id
                          ? "border-brand-pink bg-brand-pink-light"
                          : "border-brand-beige hover:border-brand-pink-light"
                      )}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <p className="font-semibold text-brand-brown">
                          {method.label}
                        </p>
                        <p className="text-brand-muted text-xs">
                          {method.subtitle}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          paymentMethod === method.id
                            ? "border-brand-pink bg-brand-pink"
                            : "border-brand-beige"
                        )}
                      >
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {paymentMethod === "razorpay" && (
                  <div className="p-4 bg-brand-cream rounded-2xl mb-6">
                    <div className="flex items-center gap-2 text-sm text-brand-muted">
                      <Lock className="w-4 h-4 text-brand-green-dark" />
                      <span>
                        Your payment is secured by Razorpay. We never store your
                        card details.
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-ghost border border-brand-beige px-6"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    id="place-order-btn"
                    className="btn-primary flex-1 justify-center py-4 shadow-pink"
                  >
                    {processing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-brand-brown/30 border-t-brand-brown rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        Place Order — {formatPrice(total)}{" "}
                        <Lock className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-28">
              <h3 className="font-display font-semibold text-brand-brown text-lg mb-4">
                Your Order
              </h3>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-pink text-brand-brown text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-brown text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-brand-muted text-xs">
                        {formatPrice(item.product.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-brand-brown text-sm shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-beige pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-brand-green-dark font-medium" : ""}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-display font-bold text-brand-brown text-base pt-2 border-t border-brand-beige">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-brand-green-light/40 rounded-2xl flex items-center gap-2 text-xs text-brand-green-dark">
                <Truck className="w-4 h-4 shrink-0" />
                <span>
                  {shipping === 0
                    ? "Free shipping applied!"
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
