/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/bytebase_login',
  assetPrefix: '/bytebase_login/',
  trailingSlash: true,
}

export default nextConfig
