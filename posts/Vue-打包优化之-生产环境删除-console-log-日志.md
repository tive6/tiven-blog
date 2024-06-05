---
title: Vue 打包优化之 生产环境删除 console 日志
tags:
- Vue
- Webpack
- Babel
categories:
- webpack / parcel
abbrlink: 73b0f277
date: 2022-07-28 16:00:18
---

使用 **vue-cli 3.0** (`@vue/cli`) 脚手架构建的项目，一般在本地开发过程中，会有不少 `console` 调试信息。如果不处理这些日志信息，默认情况下，即使是构建生产环境的包，这些 `console` 打印也不会被移除，这显然是不够严谨的。所以就介绍一下怎么来配置根据环境删除 `console` 日志。

![vue remove console](https://tiven.cn/static/img/img-vue-02-vnCFBMX9o39TemLsW6asl.jpg)


<!-- more -->

## 一、项目依赖

```json
{
  "dependencies": {
    "axios": "^0.18.1",
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
    "babel-plugin-transform-remove-console": "^6.9.4",
    "vue-template-compiler": "^2.7.10",
    "webpack-bundle-analyzer": "^4.7.0"
  }
}
```

## 二、配置

1. 下载 `babel-plugin-transform-remove-console` 包

```shell
npm i -D babel-plugin-transform-remove-console
```

2. 配置 `babel.config.js` 

```js
const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/app'],
  plugins: [...plugins],
}
```

3. 完成，`npm run build` 打包体验。

---

欢迎访问：[天问博客](https://tiven.cn/p/73b0f277/ "天问博客-专注于大前端技术")
