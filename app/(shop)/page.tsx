import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramSection from "@/components/home/InstagramSection";

export const metadata: Metadata = {
  title: "Pooja Handmade Art — Premium Handcrafted Felt Products",
  description:
    "Meticulously handcrafted by skilled women artisans, our creations embody artistry, heritage craftsmanship and the spirit of women’s empowerment.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <CategoriesSection />
      <BestSellersSection />
      <ReviewsSection />
      <InstagramSection />
    </>
  );
}
