/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    REACT_APP_MAGIN_LINK_KEY: process.env.REACT_APP_MAGIN_LINK_KEY,
    REACT_APP_WALLET_CONNECT_INFURA_ID:
      process.env.REACT_APP_WALLET_CONNECT_INFURA_ID,
    REACT_APP_MNEMONIC_API_KEY: process.env.REACT_APP_MNEMONIC_API_KEY,
    REACT_APP_OPENSEA_API_KEY: process.env.REACT_APP_OPENSEA_API_KEY,
    REACT_GOOGLE_MAPS_API_KEY: process.env.REACT_GOOGLE_MAPS_API_KEY,
    REACT_APP_NFTPORT_API_KEY: process.env.REACT_APP_NFTPORT_API_KEY,
    REACT_APP_MIX_PANEL_ID_STAGING: process.env.REACT_APP_MIX_PANEL_ID_STAGING,
    REACT_APP_MIX_PANEL_ID_PROD: process.env.REACT_APP_MIX_PANEL_ID_PROD,
    REACT_APP_INTERCOM_ID: process.env.REACT_APP_INTERCOM_ID,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your collab has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: false,
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  swcMinify: false,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
  transpilePackages: ['react-tweet']

};

module.exports = nextConfig;
