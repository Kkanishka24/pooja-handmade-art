import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import InstagramSection from "@/components/home/InstagramSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Pooja Handmade Art — Premium Handcrafted Felt Products",
  description:
    "Discover beautifully handcrafted felt products — nursery décor, festive decorations, home décor, personalized gifts, and more. 100% handmade with love.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
      <NewArrivalsSection />
      <WhyChooseUsSection />
      <ReviewsSection />
      <InstagramSection />
      <NewsletterSection />
    </>
  );
}
