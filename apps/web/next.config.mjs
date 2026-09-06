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

  // Every route the redesign retired keeps answering, permanently, with its
  // slug intact — those URLs are in the index (REDESIGN.md §4.1, §7).
  //
  // statusCode: 301 rather than `permanent: true`, which emits 308. Search
  // engines treat the two the same, but §7 asks for 301 and these are all GET
  // pages, so there is no method to preserve.
  //
  // Order matters: the /apps/<app>/privacy and /terms pages are a store
  // requirement and must survive, so they are matched before /apps/:id.
  async redirects() {
    return [
      // --- kept: App Store / Google Play required pages ----------------------
      // Listed only to make it explicit that they are deliberately NOT
      // redirected. /apps/:id below would otherwise be read as covering them;
      // it does not, because static segments win over dynamic ones and these
      // are two segments deep.

      // --- product and project detail pages -> /works/<slug> ----------------
      { source: '/solutions/:slug', destination: '/works/:slug', statusCode: 301 },
      { source: '/projects/:slug', destination: '/works/:slug', statusCode: 301 },

      // --- listings ---------------------------------------------------------
      { source: '/portfolio', destination: '/works', statusCode: 301 },
      { source: '/solutions', destination: '/works', statusCode: 301 },
      { source: '/projects', destination: '/works', statusCode: 301 },
      { source: '/partners', destination: '/works', statusCode: 301 },
      { source: '/apps', destination: '/works', statusCode: 301 },

      // --- services became the price list -----------------------------------
      { source: '/services', destination: '/pricing', statusCode: 301 },

      // --- legacy /apps/<id> ------------------------------------------------
      // These three were app pages long before /projects existed. They now go
      // straight to the work page rather than through a second redirect.
      { source: '/apps/oqyol', destination: '/works/oqyol', statusCode: 301 },
      { source: '/apps/moneycontrol', destination: '/works/money-control', statusCode: 301 },
      { source: '/apps/memomind', destination: '/works/memomind', statusCode: 301 },
      { source: '/apps/:id', destination: '/works', statusCode: 301 },
    ];
  },
};

export default nextConfig;
