const path = require('path')

module.exports = {
  reactStrictMode: true,

  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: false
  },
  trailingSlash: true,
  images: {
    domains: [process.env.WP_IMAGES_URL],
    loader: 'default',
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}
