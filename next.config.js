/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["v0.blob.com", "blob.v0.dev", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    unoptimized: true,
  },
  output: "standalone",
}

module.exports = nextConfig
