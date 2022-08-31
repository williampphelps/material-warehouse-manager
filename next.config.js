/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      MONGODB_URI: "mongodb://localhost:27017/kelly_inventory2",
      NEXTAUTH_SECRET: "3ATO/othHG/MuYqadrLF5lFRjzuECQrapRMeU1i/pOg=",
      NEXTAUTH_URL: "http://localhost:3000",
  }
}

module.exports = nextConfig
