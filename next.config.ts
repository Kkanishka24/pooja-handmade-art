import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
    ],
  },
};

export default nextConfig;
