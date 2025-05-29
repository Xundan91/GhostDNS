/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true, // ✅ App Router support
  },
};

module.exports = nextConfig;
