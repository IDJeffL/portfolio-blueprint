const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname(),'trustpaytest.wpengine.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  
});
