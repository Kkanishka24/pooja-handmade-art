import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pooja Handmade Art — Premium Handcrafted Felt Products",
    template: "%s | Pooja Handmade Art",
  },
  description:
    "Discover handcrafted felt products — nursery décor, festive decorations, home décor, gifts, and personalized crafts. Every piece hand-stitched with love using premium felt fabric.",
  keywords: [
    "handmade felt",
    "felt crafts",
    "nursery decor",
    "felt toys",
    "handcrafted gifts",
    "felt decorations",
    "Indian handmade",
    "felt art",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Pooja Handmade Art",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body bg-brand-cream text-brand-brown antialiased">
        {children}
      </body>
    </html>
  );
}
