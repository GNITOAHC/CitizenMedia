/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
