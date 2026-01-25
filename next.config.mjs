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

  // Redirects for legacy routes
  async redirects() {
    return [
      // Redirect old app pages to new project pages
      {
        source: '/apps/oqyol',
        destination: '/projects/oqyol',
        permanent: true,
      },
      {
        source: '/apps/moneycontrol',
        destination: '/projects/money-control',
        permanent: true,
      },
      {
        source: '/apps/memomind',
        destination: '/projects/memomind',
        permanent: true,
      },
      // Redirect /apps listing to /projects
      {
        source: '/apps',
        destination: '/projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
