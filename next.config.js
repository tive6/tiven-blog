// next.config.js
const UnoCSS = require('@unocss/webpack').default

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placekitten.com', 'tiven.cn'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'placekitten.com',
    //     port: '',
    //     pathname: '/',
    //   },
    // ],
  },
  webpack: (config) => {
    config.cache = false
    config.plugins.push(UnoCSS())
    return config
  },
}

module.exports = nextConfig
