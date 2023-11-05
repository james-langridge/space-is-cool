// import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
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

// export default withPlaiceholder(nextConfig)
module.exports = nextConfig