/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    // Set unoptimized to true to avoid vercel charges
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
      },
      {
        protocol: 'http',
        hostname: 'mars.nasa.gov',
      },
      {
        protocol: 'http',
        hostname: 'mars.jpl.nasa.gov',
      },
    ],
  },
}

module.exports = nextConfig
