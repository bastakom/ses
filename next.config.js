const path = require('path')
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv'
  },
  images: {
    domains: [process.env.WP_IMAGES_URL]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

module.exports = nextConfig
