/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      MONGODB_URI: "mongodb://localhost:27017/kelly_inventory2",
  }
}

module.exports = nextConfig
