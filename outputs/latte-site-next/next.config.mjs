/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/latte-site",
  assetPrefix: "/latte-site",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;