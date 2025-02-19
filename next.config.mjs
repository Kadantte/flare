/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "s3.nyeki.dev" }],
    unoptimized: true,
  },
};

export default nextConfig;
