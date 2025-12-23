/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript errors are now fixed properly
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
