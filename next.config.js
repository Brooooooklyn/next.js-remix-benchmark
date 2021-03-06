/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  generateEtags: false,
  reactStrictMode: false,
  httpAgentOptions: {
    keepAlive: false,
  },
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: false,
  target: 'serverless',
}

module.exports = nextConfig
