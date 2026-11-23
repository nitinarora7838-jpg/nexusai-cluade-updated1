/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,

  // Old pages that no longer exist → the most relevant new page (permanent 308).
  async redirects() {
    return [
      { source: '/monitoring', destination: '/', permanent: true },
      { source: '/monitoring/:path*', destination: '/', permanent: true },
      { source: '/dashboard', destination: '/', permanent: true },
      { source: '/dashboard/:path*', destination: '/', permanent: true },
      { source: '/products/ai-customer-support-agent', destination: '/voice-agents', permanent: true },
      {
        source:
          '/products/:slug(ai-workflow-engine|ai-automation-studio|ai-reporting-system|ai-productivity-assistant)',
        destination: '/automation',
        permanent: true,
      },
      { source: '/products', destination: '/', permanent: true },
      { source: '/products/:path*', destination: '/', permanent: true },
      { source: '/case-studies', destination: '/', permanent: true },
      { source: '/case-studies/:path*', destination: '/', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: process.env.NODE_ENV === 'development' ? 'SAMEORIGIN' : 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
