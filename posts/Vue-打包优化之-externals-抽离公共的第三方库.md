---
title: Vue 打包优化之 externals 抽离公共的第三方库
tags:
- Vue
- Webpack
- npm
categories:
- webpack / parcel
abbrlink: edae9a97
date: 2022-11-28 19:14:47
---

使用 `@vue/cli` 脚手架构建的 Vue 全家桶项目，默认配置下，打包后会把 `vue`、`vue-router`、`axios`、`vuex`、`element-ui`、`echarts` 等公共库打包在一起，导致基础 `chunk`、`vendor` 包体积特别大，有时一个文件能达到 **3-5MB**，这会大大影响首次加载速度。因此需要抽离第三方公共库，配合使用 CDN 加速。

![Vue Externals](https://tiven.cn/static/img/img-vue-02-vnCFBMX9o39TemLsW6asl.jpg)

<!-- more -->

## 一、前言

项目依赖：

```json
{
  "name": "vue-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "vue-cli-service serve --mode local",
    "dev": "vue-cli-service serve --mode dev",
    "test": "vue-cli-service build --mode test",
    "serve": "vue-cli-service serve ",
    "s": "nodemon --watch vue.config.js --exec \"npm start\"",
    "build": "vue-cli-service build",
    "build:az": "vue-cli-service build --report",
    "git": "tive git -c tive.git.config.js",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "axios": "^0.18.1",
    "d3": "^6.7.0",
    "dagre-d3": "^0.6.4",
    "echarts": "^5.3.3",
    "element-ui": "^2.15.9",
    "v-clipboard": "^2.2.3",
    "vue": "^2.7.10",
    "vue-router": "^3.6.5",
    "vuex": "^3.6.2"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.12.1",
    "@vue/cli-plugin-eslint": "^3.12.1",
    "@vue/cli-service": "^3.12.1",
    "compression-webpack-plugin": "^3.0.0",
    "html-webpack-externals-plugin": "^3.8.0",
    "less": "^3.13.1",
    "less-loader": "^4.1.0",
    "msw": "^0.47.3",
    "msw-tools": "latest",
    "uglifyjs-webpack-plugin": "^2.2.0",
    "vue-template-compiler": "^2.7.10",
    "webpack-bundle-analyzer": "^4.7.0"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {},
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ],
  "msw": {
    "workerDirectory": "public"
  }
}
```

案例：项目整体使用了 `element-ui`，其中后台服务消费监控可视化引入了 `echarts`，元数据表血缘关系图使用了 `d3` 和 `dagre-d3`，这几个库本身体积就不小，打包到一起后体积更大。

## 二、优化配置

1. 安装 `html-webpack-externals-plugin` 

```shell
npm i -D html-webpack-externals-plugin
```

2. 配置 `vue.config.js`

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: '/datalk/',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    port: 1024,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://tiven.cn/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: (config) => {
    if (isProduction) {
      config.performance = {
        hints: false,
      }
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    } else {
      config.devtool = 'source-map'
    }
    
    // HtmlWebpackExternalsPlugin 关键配置 start
    config.plugins.push(
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'vue',
            entry: {
              path: 'dist/vue.min.js',
              type: 'js',
            },
            global: 'Vue',
          },
          {
            module: 'element-ui',
            entry: ['lib/index.js', 'lib/theme-chalk/index.css'],
            supplements: ['lib/theme-chalk/fonts/'],
            global: 'ELEMENT',
          },
          {
            module: 'axios',
            entry: {
              path: 'dist/axios.min.js',
            },
            global: 'axios',
          },
          {
            module: 'echarts',
            entry: {
              path: 'dist/echarts.min.js',
              attributes: {
                async: '',
                // defer: '',
              },
            },
            global: 'echarts',
            // append: true,
          },
          {
            module: 'd3',
            entry: {
              path: 'dist/d3.min.js',
              attributes: {
                async: '',
              },
            },
            global: 'd3',
          },
          {
            module: 'dagre-d3',
            entry: {
              path: 'dist/dagre-d3.min.js',
              attributes: {
                async: '',
              },
            },
            global: 'dagreD3',
          },
        ],
        // hash: true, // 设置后会在引用脚本时加上 hash，如下所示：
        // <script src='/datalk/vendor/vue/dist/vue.min.js?f452a239c2c0156e7b83'></script>
        // outputPath: 'static/lib', // 输出目录，默认为 vendor
        // publicPath: '/assets/', // 公共路径，默认为 /
      })
    )
    // HtmlWebpackExternalsPlugin 关键配置 end
    
    // 生成打包报告
    if (process.env.npm_lifecycle_event === 'build:az') {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
}
```

## 三、配置说明

* **module** ：库名，也就是 `package.json` 中的包依赖名。
* **entry** ：入口，有几种类型，`string | array<string> | object | array<object | string>`，可以设置 **CDN** 地址，如：`https://cdn.tiven.cn/assets/js/vue.min.js` ；也可以设置文件路径，如：`dist/vue.min.js`，相对于项目的路径就是：`node_modules/vue/dist/vue.min.js`。
* **global** ：注册到 `window` 上的全局变量，注意不能配错，否则代码会报错。
* **supplements** ：补充文件，在上边 `element-ui` 配置中，因为 `css` 文件中依赖了大量的 `font` 字体文件，所以在打包时需要把这些依赖文件根据相对路径复制到 `dist` 对应的目录中。
* **attributes** ：设置引用这些抽离出去包的 `script` 或 `link` 标签的属性，`defer`、`async`、`crossorigin`、`global` 等等，可以根据需要进行配置。

因为首页首次渲染不依赖 `echarts`、`d3`、`dagre-d3` 等第三方库，所以给 script 标签加上了 `async` 属性，脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行），这样可以不阻塞页面渲染，提升首屏加载速度，提高用户体验。

## 四、打包对比

使用 `webpack-bundle-analyzer` 生成打包报告，优化前如图所示：

![Vue BundleAnalyzer Report](https://tiven.cn/static/img/img-dist-01-WIKK_8kojGzKsT2hnqHZg.jpg)

优化后如图所示：

![Vue BundleAnalyzer Report](https://tiven.cn/static/img/img-dist-02-xPl1If1Or23lfGUp63NtW.jpg)

公共包被抽离出去，`chunk` 包总体积从 **2.8MB** 变成 **670KB** ，减小了 **70%** 多，优化效果很明显。

## 五、打包输出

打包后 dist 目录：

```txt
dist/
  static/
    css/
    ...
    img/
    ...
    js/
      app.f462a90f.js
      app.f462a90f.js.gz
      chunk-0af562fc.fcb27ef3.js
      chunk-1f6412f4.625202a5.js
      chunk-1f6412f4.625202a5.js.gz
      ...
  vendor/
    axios/
      dist/
        axios.min.js  
        axios.min.js.gz
    d3/
      dist/
        d3.min.js    
        d3.min.js.gz
    dagre-d3/
      dist/
        dagre-d3.min.js    
        dagre-d3.min.js.gz
    echarts/
      dist/
        echarts.min.js    
        echarts.min.js.gz
    element-ui/
      lib/
        theme-chalk/
          fonts/
            element-icons.ttf
            element-icons.woff
          index.css
          index.css.gz
        index.js    
        index.js.gz
    vue/
      dist/
        vue.min.js    
        vue.min.js.gz
  favicon.ico      
  index.html
```

打包后，会发现把这些抽离出去的包直接引入到 `index.html` 中，如下所示：

```html
<body>
  <noscript>
    <strong>
      We're sorry but regeng doesn't work properly without JavaScript enabled. Please enable it to continue.
    </strong>
  </noscript>
  <div id='app'></div>
  <script src='/datalk/vendor/vue/dist/vue.min.js'></script>
  <script src='/datalk/vendor/element-ui/lib/index.js'></script>
  <script src='/datalk/vendor/axios/dist/axios.min.js'></script>
  <script src='/datalk/vendor/echarts/dist/echarts.min.js' async></script>
  <script src='/datalk/vendor/d3/dist/d3.min.js' async></script>
  <script src='/datalk/vendor/dagre-d3/dist/dagre-d3.min.js' async></script>
  <script src='/datalk/static/js/app.f462a90f.js'></script>
</body>
```

## 六、踩坑记录

`element-ui` 配置 `externals` 时，可能会遇到这样的报错：`Uncaught ReferenceError: ElementUI is not defined at element-ui (external "ElementUI":1:1)` ，这说明 `element-ui` 模块的 `global` 参数配置错了，在全局 window 上找不到，你可能配置的是 **ElementUI、Element、element-ui**，这些都是不对的。必须是 `global: 'ELEMENT'`。

---

欢迎访问：[天问博客](https://tiven.cn/p/edae9a97/ "天问博客-专注于大前端技术")
