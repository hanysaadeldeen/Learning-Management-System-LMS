/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io", "img.clerk.com"],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
