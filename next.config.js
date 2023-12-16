/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL
  }
}

module.exports = nextConfig
