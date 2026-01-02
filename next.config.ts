import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep unoptimized true if you want to avoid Vercel Image Optimization limits on free tier, 
    // or remove it to use Vercel's optimized images. 
    // For now, let's keep it simple or remove it. 
    // Actually, Vercel handles images fine. Let's remove unoptimized to get better performance.
  },
};

export default nextConfig;
