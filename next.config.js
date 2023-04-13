/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.notion.so"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
