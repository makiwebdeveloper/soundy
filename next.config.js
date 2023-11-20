/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  env: {
    DATABASE_URL: "postgresql://illia.makovetsky:YD2GixfFmA6b@ep-late-brook-48368888.eu-central-1.aws.neon.tech/soundy?sslmode=require"
  }
}

module.exports = nextConfig
