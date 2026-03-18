/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Server Actions are now stable in Next.js 14.2+
  serverActions: {
    allowedOrigins: [
      'localhost:3000',
      'https://aerodesk-platform.vercel.app',
      'https://*.vercel.app',
    ],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental features you might need
  experimental: {
    optimizeCss: true, // Optional: optimizes CSS
  },
}

module.exports = nextConfig
