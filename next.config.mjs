/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    '@blocknote/server-util',
    'jsdom',
    'mongodb',
  ],
}

export default nextConfig
