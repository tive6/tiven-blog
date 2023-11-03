// next.config.js
const UnoCSS = require('@unocss/webpack').default
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
// const CopyPlugin = require('copy-webpack-plugin')

// const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.BASE_PATH || ''
console.log({ basePath })

module.exports = (phase, { defaultConfig }) => {
  // console.log(phase, defaultConfig)
  let isDev = phase === PHASE_DEVELOPMENT_SERVER
  if (isDev) {
    // development
    console.log('development')
  }
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    basePath,
    // trailingSlash: true, //  /about -> /about/
    // Use the CDN in production and localhost for development.
    // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
    swcMinify: true,
    reactStrictMode: !isDev,
    // productionBrowserSourceMaps: true,
    // compress: false, // gzip 压缩
    // devIndicators: {
    //   buildActivity: false, // 开发环境显示编译指示器
    //   buildActivityPosition: 'bottom-right',
    // },
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
    env: {
      customKey: 'my-value',
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.cache = false
      config.plugins.push(UnoCSS())
      if (!dev) {
        // config.plugins.push(
        //   new CopyPlugin({ patterns: [{ from: 'fonts', to: 'fonts' }] })
        // )
      }
      return config
    },
    async rewrites() {
      return [
        // {
        // source: '/api/g/:path*',
        // destination: '/g/:path*',
        // basePath: false,
        // },
      ]
    },
    async headers() {
      return [
        {
          source: '/posts/:path*',
          headers: [
            {
              key: 'x-post-header',
              value: 'post header value',
            },
            {
              key: 'x-another-custom-header',
              value: 'other custom header value',
            },
          ],
        },
        {
          source: '/posts/:id',
          headers: [
            {
              key: 'x-post-id',
              value: ':id', // Matched parameters can be used in the value
            },
            {
              key: 'x-post-:id', // Matched parameters can be used in the key
              value: 'post id is :id',
            },
          ],
        },
      ]
    },
  }

  return nextConfig
}
