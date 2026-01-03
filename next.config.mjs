/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone for Railway deployment
  output: 'standalone',

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
