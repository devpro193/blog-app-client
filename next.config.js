/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    UNSPLASH_KEY: process.env.UNSPLASH_KEY
  }
}

module.exports = nextConfig
