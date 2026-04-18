/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  assetPrefix: '/eygpt-travel-guide',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
