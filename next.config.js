/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io']
  },
  env: {
    DATABASE_URL: "postgresql://illia.makovetsky:eqXDdJ8Ghx9O@ep-quiet-truth-21876389.eu-central-1.aws.neon.tech/soundy-db?sslmode=require"
  }
}

module.exports = nextConfig
