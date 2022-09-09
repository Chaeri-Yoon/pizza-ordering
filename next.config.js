/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL
  }
}

module.exports = nextConfig
