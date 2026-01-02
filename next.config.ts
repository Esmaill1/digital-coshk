import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/digital-coshk' : '',
  assetPrefix: isProd ? '/digital-coshk/' : '',
};

export default nextConfig;
