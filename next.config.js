const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        // Set the cache-control header to disable caching
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
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
