/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_ID: process.env.CLIENT_ID
  }
}

module.exports = nextConfig
