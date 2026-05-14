import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [55, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
}

export default nextConfig
