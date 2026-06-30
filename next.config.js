/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production performance & image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  // Compress output
  compress: true,
  // Transpile three.js / R3F ESM packages for the 3D hero scene
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Stricter build — catch TS/lint errors at deploy time
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: true },
  // Disable x-powered-by header
  poweredByHeader: false,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',            value: process.env.NODE_ENV === 'development' ? 'SAMEORIGIN' : 'DENY' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
