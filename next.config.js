const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180'
          }
        ]
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180'
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          }
        ]
      }
    ]
  },
  reactStrictMode: true,

  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: false
  },
  trailingSlash: true,
  images: {
    domains: [process.env.WP_IMAGES_URL]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

module.exports = nextConfig
